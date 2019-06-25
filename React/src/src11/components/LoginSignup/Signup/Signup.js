import React, { Component } from 'react';
import './Signup.css';
import AuthService from '../../../AuthService/AuthService'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
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
    };

    handleChange = (e) => {
        let x = e.target.name
        this.setState(
            {
                [x]: e.target.value
            }
        )
    }
    handleChangearr = (e) => {
        let x = e.target.name
        let temp = e.target.value.split(',')
        this.setState(
            {
                [x]: temp
            }
        )
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
                                <div className="Sformdiv">
                                    <form>
                                        <span>Username:</span>
                                        <input name='Username' type="text" onChange={this.handleChange} required /><br /><br />

                                        <span>Email:</span>
                                        <input type="email" name='Email' onChange={this.handleChange} required /><br /><br />

                                        <span>Phone:</span>
                                        <input type="number" name="Phone" onChange={this.handleChange} required /><br /><br />

                                        <span>password:</span>
                                        <input type="password" name='Password' onChange={this.handleChange} required /><br /><br />

                                        <Button type="submit" variant="primary" className="Sformbutton" onClick={this.detailsHandler}>Sign Up</Button>
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

                                        <span>First Name:</span>
                                        <input type="text" name="First" onChange={this.handleChange} required /><br /><br />
                                        <span>Last Name:</span>
                                        <input type="text" name="Last" onChange={this.handleChange} required /><br /><br />
                                        <span>Interest:</span>
                                        <input type="text" name="Interest" onChange={this.handleChangearr} required /><br /><br />
                                        <span>Area of Specialization:</span>
                                        <input type="text" name='AOS' onChange={this.handleChangearr} required /><br /><br />

                                        <Button type="submit" onClick={this.handleSubmit} variant="primary" className="Sformbutton"><NavLink to="/" className="SNA">Save Profile</NavLink></Button>
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