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
            password: ''
        }
        this.Auth = new AuthService();
    }

    handleFormSubmit = (e) => {
        // e.preventDefault();

        // this.Auth.login(this.state.username, this.state.password)
        e.preventDefault();

        this.Auth.login(this.state.userName, this.state.password)
            .then(res => {
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })

    }

    handleChange = (e) => {
        let x = e.target.name
        this.setState(
            {
                [x]: e.target.value
            }
        )
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
                                <span>Username:</span>
                                <input type="text" name='userName' required onChange={this.handleChange} /><br /><br />
                                <span>password:</span>
                                <input type="password" name='password' required onChange={this.handleChange} /><br /><br />

                                <Button type="submit" variant="primary" className="Lformbutton" onClick={this.handleFormSubmit}>Sign In</Button><br /><br />
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