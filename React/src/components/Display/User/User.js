import React, { Component } from 'react';
import './User.css'
import DP from '../../../Images/DP.png';
import My from '../../../Images/My.jpg';
import AuthService from '../../../AuthService/AuthService'
import { NavLink } from 'react-router-dom'
class User extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
    }
    state = {
        username: '',
        results: [],
        img: DP

    }
    componentDidMount() {
        this.getResults()
    }
    getResults = () => {
        this.Auth.fetch('http://localhost:5000/api/viewotherprofile', {
            method: 'POST', body: JSON.stringify({

                username: this.state.username
            })
        }).then(res => {
            this.setState({ results: res })
            console.log(this.state)
        })
            .catch(err => console.log('downques', err))
    }

    handleChange = (e) => {
        let x = e.target.name
        this.setState(
            {
                [x]: e.target.value
            }
        )
        this.getResults()
    }

    render() {
        let disp = ''
        let myDP = ''
        if (this.state.results.length) {
            disp = this.state.results.map(r => {
                if (r.profile !== '') {
                    myDP = r.profile
                }
                else {
                    myDP = DP
                }
                return (<div className="Userbox">
                    <div className="Imagediv">
                        <div className="Image">
                            <img src={myDP} />
                        </div>
                    </div>
                    <div className="Usernamediv">
                        <div className="username">
                            <a href="javascript:void(0);"><NavLink to={"/Pro/" + (r.userName)}>{r.userName}</NavLink></a>
                        </div>
                    </div>
                    <div className="Scorediv">
                        <div className="score">
                            <p>Points:{r.rep}  </p>
                        </div>
                    </div>
                </div>)
            })
        }
        return (
            <div>
                <div className="U_topbar">
                    <h3>Users</h3>
                    <input type="search" placeholder="Find User" name='username' onChange={this.handleChange} /><br />
                    <hr />
                </div>

                <div className="Users_div">
                    {disp}
                </div>

            </div>
        );
    }

}

export default User