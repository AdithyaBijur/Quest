import React, { Component } from 'react';
import './Communities.css'

import { Button } from 'react-bootstrap';
import CP from '../../../Images/C++.png';
import My from '../../../Images/My.jpg';
import AuthService from '../../../AuthService/AuthService'

import { NavLink } from 'react-router-dom';
const butt = {
    width: "200px",
    height: "40px",
    fontWight: "bold",
    float: "right",
    marginTop: "10px",
    marginRight: "74px",
    fontSize: "15px",
}

class Communities extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
    }
    state = {
        Name: '',
        results: []
    }
    componentDidMount() {
        this.getResults()
    }
    getResults = () => {
        this.Auth.fetch('http://localhost:5000/api/searchcommunity', {
            method: 'POST', body: JSON.stringify({

                Name: this.state.Name
            })
        }).then(res => {
            this.setState({ results: res })
            console.log(this.state)
        })
            .catch(err => console.log(err))
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
        let dp = CP
        if (this.state.results.length > 0) {
            disp = this.state.results.map(r => {
                if (r.profile !== '' && r.profile !== undefined) {
                    dp = r.profile
                }
                else {
                    dp = CP
                }
                return (<div className="Commubox">
                    <div className="Imagediv">
                        <div className="Image">
                            <img src={dp} />
                        </div>
                    </div>
                    <div className="CUsernamediv">
                        <div className="Cusername">
                            <a href=""><NavLink to={"/Community/" + (r.Name)}>{r.Name} </NavLink></a>
                        </div>
                    </div>
                    <div className="CScorediv">
                        <div className="Cscore">
                            <p>Members Count:{r.nom}   </p>
                        </div>
                    </div>
                </div>)
            })
        }
        return (
            <div>
                <div className="C_topbar">
                    <h3>Communities</h3>
                    <input type="search" placeholder="Search for Community" name="Name" onChange={this.handleChange} />
                    <NavLink to="/CreateCommunity"><Button className="add_but" style={butt}>
                        CREATE COMMUNITY</Button></NavLink>
                    <hr />
                </div>

                <div className="Commu_div">
                    {disp}
                </div>

            </div>
        );
    }

}

export default Communities