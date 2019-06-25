import React, { Component } from 'react';
import './CreateCommunity.css';
import Nav from '../Header/Header';
import AuthService from '../../AuthService/AuthService';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const butt = {
    width: "150px",
    height: "40px",
    fontWight: "bold",
    marginTop: "10px",
    marginLeft: "177px",
    fontSize: "15px",
}
class CreateCommunity extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            commuName: '',
            commuDescription: '',
            commuLocation: '',
            commuOpen: true

        }
    }


    addCommuHandler = () => {
        console.log(this.state.commuName, "  ", this.state.commuOpen, "  ", this.state.commuLocation, "  ", this.state.commuDescription)
        this.Auth.fetch('http://localhost:5000/api/createcommunity', {
            method: 'POST', body: JSON.stringify({
                name: this.state.commuName,
                open: this.state.commuOpen,
                location: this.state.commuLocation,
                description: this.state.commuDescription
            })
        }).then(res => {
            console.log("Successfully Created Congratulations", res)
        })
            .catch(err => console.log('CreateCommunity error', err))
    }

    handleChange = (e) => {
        let x = e.target.name
        this.setState(
            {
                [x]: e.target.value
            }
        )
    }


    CommunityhandleChange = (e) => {
        let y = e.target.name
        if (y === 'false' || y === 'False') {
            this.setState({
                commuOpen: false
            })
        }
    }

    render() {
        return (
            <div>
                <div className="CCFirst">
                    <Nav />
                </div>
                <div className="CCSecond">
                    <div className="CreateFormDiv">
                        <form>
                            <div className="CCFORM">
                                <span className="CCSPAN">Community DP:</span>
                                <label for="files" class="DPL">Select Image</label>
                                <input id="files" type="file" className="DPI" required /><br /><br />
                                <span className="CCSPAN">Community name:</span>
                                <input type="text" placeholder="Enter Unique Name" className="CNI" name="commuName" onChange={this.handleChange} required /><br /><br />
                                <span className="CCSPAN">Open Community:</span>
                                <input type="text" placeholder="True OR False" className="CNI" name="commuOpen" onChange={this.CommunityhandleChange} required /><br /><br />
                                <span className="CCDes">Description:</span>
                                <textarea placeholder="write something about your Community............" name="commuDescription" onChange={this.handleChange} required></textarea>
                                <br /><br />
                                <span className="CCSPAN">Location:</span>
                                <input type="text" placeholder="Enter Location" className="LI" name="commuLocation" onChange={this.handleChange} required /><br /><br />
                                {/* <NavLink to="/"><Button className="add_but" style={butt} type="submit" onClick={this.addCommuHandler}>CREATE</Button></NavLink><br /><br /><br /> */}
                                <NavLink to="/"><Button className="add_but" style={butt} type="submit" onClick={this.addCommuHandler}>CREATE</Button></NavLink><br /><br /><br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateCommunity