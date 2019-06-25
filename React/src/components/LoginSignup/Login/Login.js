import React, { Component } from 'react';
import './Login.css';
import AuthService from '../../../AuthService/AuthService'

import Header from '../../Header/Header';
import { Button } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            formErrors: { password: '', user: '' },
            userValid: false,
            passwordValid: false,
            formValid: false
        }
        this.Auth = new AuthService();
    }

    handleFormSubmit = (e) => {
        // e.preventDefault();

        // this.Auth.login(this.state.username, this.state.password)
        e.preventDefault();

        this.Auth.login(this.state.userName, this.state.password)
            .then(res => {

                if (this.state.userName === 'nilesh')
                    this.props.history.replace('/Admin');
                else
                    this.props.history.replace('/');
            })
            .catch(err => {
                alert(err, err.name, err.message)
            })

    }

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

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let userValid = this.state.userValid;
        switch (fieldName) {

            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'password is too short';
                break;
            case 'userName':
                userValid = value.length > 2
                fieldValidationErrors.user = userValid ? '' : 'UserName is too small';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            passwordValid: passwordValid,
            userValid: userValid
        }, this.validateForm);
    }

    validateForm() {
        console.log(this.state)
        this.setState({
            formValid: this.state.userValid && this.state.passwordValid
        });
    }


    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
            <div>
                <div className="LFirst">
                    <header className="toolbar">
                        <nav className="nevigation_menu">
                            <div className="Llogo_style">
                                <a href="">Quest</a>
                            </div>
                        </nav>
                    </header>
                </div>
                <div className="LSecond">
                    <div className="Logindiv">
                        <div className="TopDesc">
                            <h3>Login</h3><hr />
                        </div>
                        <div className="Lformdiv">
                            <form>
                                <div>
                                    <span style={{ float: 'left', marginRight: 250 }}>Username:</span>
                                    <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.user}</span>
                                    <input type="text" name='userName' required onChange={this.handleChange} /><br /><br />

                                </div>
                                <div>
                                    <span style={{ float: 'left', marginRight: 250 }}>password:</span>
                                    <span style={{ 'color': 'red', float: 'left', fontSize: 16 }}>{this.state.formErrors.password}</span>
                                    <input type="password" name='password' required onChange={this.handleChange} /><br /><br />

                                </div>
                                <Button type="submit" variant="primary" className="Lformbutton" disabled={!this.state.formValid} onClick={this.handleFormSubmit}>Sign In</Button><br /><br />
                            </form>
                        </div>

                        <hr />
                        <div className="Lredirectdiv">

                            <NavLink to="/Signup" className="NA">Sign up here</NavLink> <p>or sign in with</p>
                            {/* <a href="#">Sign up here</a> <p>or sign in with</p> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login