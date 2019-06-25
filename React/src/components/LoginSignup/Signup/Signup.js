import React, { Component } from 'react';
import './Signup.css';
import AuthService from '../../../AuthService/AuthService'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import FormErrors from '../../../FormValidator/FormValidator'
class Signup extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
    }

    state = {
        open: false,
        details: false,
        signup: true,
        Username: '',
        Email: '',
        Phone: '',
        Password: '',
        First: '',
        Last: '',
        Interest: [],
        AOS: [],
        formErrors: { email: '', password: '', phone: '', first: '', last: '', interest: '', AOS: '', user: '' },
        emailValid: false,
        passwordValid: false,
        phoneValid: false,
        firstValid: false,
        lastValid: false,
        interestValid: false,
        AOSValid: false,
        formValid1: false,
        formValid2: false,
        userValid: false
    };

    handleChange = (e) => {
        let x = e.target.name
        let value = e.target.value
        this.setState(
            {
                [x]: e.target.value
            },
            () => { this.validateField(x, value) }
        )
    }
    handleChangearr = (e) => {
        let x = e.target.name
        let value = e.target.value
        let temp = e.target.value.split(',')
        this.setState(
            {
                [x]: temp
            },
            () => { this.validateField(x, value) }
        )
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let phoneValid = this.state.phoneValid;
        let interestValid = this.state.interestValid;
        let AOSValid = this.state.AOSValid;
        let firstValid = this.state.firstValid;
        let lastValid = this.state.lastValid;
        let userValid = this.state.userValid;
        switch (fieldName) {
            case 'Email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'email is invalid';
                break;
            case 'Password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'password is too short';
                break;
            case 'Phone':
                phoneValid = value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
                fieldValidationErrors.phone = phoneValid ? '' : 'phone is invalid';
                break;
            case 'Interest':
                interestValid = value.length > 0
                fieldValidationErrors.interest = interestValid ? '' : 'Interests cannot be empty';
                break;
            case 'AOS':
                AOSValid = value.length > 0
                fieldValidationErrors.AOS = AOSValid ? '' : 'AOS cannot be empty';
                break;
            case 'First':
                firstValid = value.length > 2
                fieldValidationErrors.first = firstValid ? '' : 'FirstName is too small';
                break;
            case 'Last':
                lastValid = value.length > 2
                fieldValidationErrors.last = lastValid ? '' : 'LastName is too small';
                break;
            case 'Username':
                userValid = value.length > 2
                fieldValidationErrors.user = userValid ? '' : 'UserName is too small';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            phoneValid: phoneValid,
            firstValid: firstValid,
            lastValid: lastValid,
            InterestValid: interestValid,
            AOSValid: AOSValid,
            passwordValid: passwordValid,
            userValid: userValid
        }, this.validateForm);
    }

    validateForm() {
        console.log(this.state)
        this.setState({
            formValid1: this.state.emailValid && this.state.phoneValid && this.state.userValid && this.state.passwordValid,
            formvalid2: this.state.firstValid && this.state.lastValid && this.state.interestValid && this.state.AOSValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleSubmit = () => {
        this.Auth.fetch('http://localhost:5000/api/signup', {
            method: 'POST', body: JSON.stringify({

                "email": this.state.Email,
                "password": this.state.Password,
                "userName": this.state.Username,
                "firstname": this.state.First,
                "lastname": this.state.Last,
                "interest": this.state.Interest,
                "aos": this.state.AOS
            })
        }).then(res => console.log("signup", res))
            .catch(err => console.log('signup', err))
    }
    detailsHandler = () => {
        // const doesShow = this.state.signinstate;
        // this.setState({ signinstate: !doesShow });

        this.setState({ signup: false });

        this.setState({ details: true });
    }


    render() {
        return (
            <div>
                <div className="SFirst">
                    <header className="toolbar">
                        <nav className="nevigation_menu">
                            <div className="Llogo_style">
                                <a href="">Quest</a>
                            </div>
                        </nav>
                    </header>
                </div>


                {
                    this.state.signup === true ?
                        <div className="SSecond">
                            <div className="Signupdiv">
                                <div className="TopDesc">
                                    <h3>Signup</h3><hr />
                                </div>
                                <div className="panel panel-default" style={{ width: 300, margin: 'auto', marginTop: 10, textAlign: 'center', color: 'red', fontWeight: 550 }}>
                                    <FormErrors formErrors={this.state.formErrors} />
                                </div>
                                <div className="Sformdiv">
                                    <form>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 300 }}>Username:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.user}</span>
                                            <input name='Username' type="text" onChange={this.handleChange} required /><br /><br />

                                        </div><div>
                                            <span style={{ float: 'left', marginRight: 350 }}>Email:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.email}</span>
                                            <input type="Email" name='Email' onChange={this.handleChange} required /><br /><br />

                                        </div>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 350 }}>Phone:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.phone}</span>
                                            <input type="number" name="Phone" onChange={this.handleChange} required /><br /><br />

                                        </div>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 300 }}>password:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.password}</span>
                                            <input type="Password" name='Password' onChange={this.handleChange} required /><br /><br />

                                        </div>
                                        <Button type="submit" variant="primary" className="Sformbutton" onClick={this.detailsHandler} disabled={!this.state.formValid1}>Sign Up</Button>
                                        <Button variant="primary" className="Sformbutton"><NavLink to="/Login" className="SNA">Login</NavLink></Button>
                                        <br /><br />
                                    </form>
                                </div>

                                <hr />

                            </div>
                        </div> : null
                }



                {
                    this.state.details === true ?
                        <div className="SSecond">
                            <div className="Signupdiv">
                                <div className="TopDesc">
                                    <h3>Details</h3><hr />
                                </div>
                                <div className="Sformdiv">
                                    <form>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 300 }}>First Name:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.first}</span>
                                            <input type="text" name="First" onChange={this.handleChange} required /><br /><br />

                                        </div>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 300 }}>Last Name:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.last}</span>
                                            <input type="text" name="Last" onChange={this.handleChange} required /><br /><br />

                                        </div>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 300 }}>Interest:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.interest}</span>
                                            <input type="text" name="Interest" onChange={this.handleChangearr} required /><br /><br />

                                        </div>
                                        <div>
                                            <span style={{ float: 'left', marginRight: 250 }}>Area of Specialization:</span>
                                            <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.AOS}</span>
                                            <input type="text" name='AOS' onChange={this.handleChangearr} required /><br /><br />

                                        </div>
                                        <Button type="submit" onClick={this.handleSubmit} variant="primary" className="Sformbutton"><NavLink to="/" className="SNA" disabled={!this.state.formValid2}>Save Profile</NavLink></Button>
                                        <br /><br />
                                    </form>
                                </div>

                                <hr />

                            </div>
                        </div> : null
                }
            </div>
        );
    }
}

export default Signup