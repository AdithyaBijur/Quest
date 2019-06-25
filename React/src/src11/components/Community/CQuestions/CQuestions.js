import React, { Component } from 'react';
import './CQuestions.css';
import VA from '../../Answer/Answer'
import { NavLink } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { Button } from 'react-bootstrap';
import AuthService from '../../../AuthService/AuthService'
class CQuestions extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            com: [],
            showallq: true,
            showva: false,
            qid: '',
            communitya: []
        }
    }

    componentWillMount() {


        // console.log("this is commu name",this.props.name)
        this.Auth.fetch('http://localhost:5000/api/communityquestion', {
            method: 'POST', body: JSON.stringify({
                name: this.props.name
            })
        }).then(res => {
            console.log("this is community quest inside CQ", res)
            this.setState({ com: res })
            // console.log("this is commmun", this.state.com)

        })
            .catch(err => console.log('latest', err))


        this.Auth.fetch('http://localhost:5000/api/viewcommunity', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            console.log("this is community", res)
            this.setState({ communitya: res })
            console.log("this is what i want", this.state.communitya)

        })
            .catch(err => console.log('commu error in CQ', err))




        this.Auth.fetch('http://localhost:5000/api/viewprofile', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            // this.setState({ Profile: res })
            // console.log("this is from api", res)
            this.setState({ username: res.userName })
            console.log(this.state.username)

        })
            .catch(err => console.log('Profile', err))


    }


    showques = (id) => {
        console.log(id)
        this.setState({ qid: id })
        this.setState({ showallq: false })
        this.setState({ showva: true })
        console.log(this.state)
        // console.log('showall')
    }



    deleteque = (queid) => {
        console.log("this is commu id",queid)

        this.Auth.fetch('http://localhost:5000/api/deletequestiongrp', {
            method: 'POST', body: JSON.stringify({
                qid: queid
            })
        }).then(res => console.log("Successfully deleted", res))
            .catch(err => console.log('Delete answer error', err))
    }



    render() {
        console.log("this is commu quest", this.state.com)
        let admin

        let tp = this.state.communitya.map(tp1 => {
            if (tp1.Name === this.props.name) {
                console.log("this is community ", tp1.Name)
                admin = tp1.createdby
            }
        })
        console.log(admin)
       
        let poq = this.state.com.map(lat => {
            let butt = ''
            if (admin == this.state.username) {
                butt = (<div className="UQDDiv">
                    {/* <Button className="UQDbutton"> Delete Question</Button> */}
                    <Button variant="outline-primary" className="UQDbutton"  onClick={() => this.deleteque(lat._id)}>Delete Question</Button>
                </div>)
            }
            
            return (
                <div>
                    <div className="UQdiv">
                        <div className="UQVUV">
                            <div className="MAINVUV">
                                <div className="votesdiv">
                                    <div className="Numberdisplay">
                                        <a href="javascript:void(0);">{lat.upvotes}</a>
                                    </div>
                                    <div className="Vtext">
                                        <a href="javascript:void(0);">Votes</a>
                                    </div>
                                </div>
                                <div className="votesdiv">
                                    <div className="Numberdisplay">
                                        <a href="javascript:void(0);">{lat.noa}</a>
                                    </div>
                                    <div className="Vtext">
                                        <a href="javascript:void(0);">Answer</a>
                                    </div>
                                </div>
                                <div className="votesdiv">
                                    <div className="Numberdisplay">
                                        <a href="javascript:void(0);">{lat.views}</a>
                                    </div>
                                    <div className="Vtext">
                                        <a href="javascript:void(0);">Views</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="QTdisplay">
                            <div className="UQQDispkay">
                                <a href="javascript:void(0);" onClick={() => this.showques(lat._id)}>{lat.question}</a>
                            </div>
                            <div className="UQTag">
                                <Chip
                                    label="JAVA"
                                    component="a"
                                    href=""
                                    clickable
                                    className="TAGS"
                                    variant="outlined"
                                />
                                <Chip
                                    label="Android"
                                    component="a"
                                    href=""
                                    clickable
                                    className="TAGS"
                                    variant="outlined"
                                />
                            </div>

                            {butt}

                        </div>
                    </div>

                    <hr />
                </div>
            )
        })





        return (
            <div>
                {
                    this.state.showallq === true ?
                        <div className="UQMAIN">
                            {poq}
                        </div> : null

                }

                {
                    this.state.showva === true ?
                        <div className="UQMAIN">
                            <VA qid={this.state.qid} />
                        </div> : null

                }


            </div>
        );
    }
}


export default CQuestions