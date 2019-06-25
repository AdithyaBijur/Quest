import React, { Component } from 'react';
import './Community.css';
import CQ from './CQuestions/CQuestions';
import { browserHistory } from 'react-router-dom'
import AuthService from '../../AuthService/AuthService';
import CA from './CAnsQuestions/CAnsQuestions';
import DP from '../../Images/DP.png';
import My from '../../Images/My.jpg';
import Header from '../Header/Header';
import { Badge } from 'react-bootstrap';
import P from '../../Images/C++.png';
import { NavLink } from 'react-router-dom'
import DI from '../../Images/DEFAULT.jpeg';
import Button from '@material-ui/core/Button';
const image1 = require('../../Images/C++.png');

class Community extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            question: true,
            answer: false,
            showEdit: false,
            showMembers: false,
            showActivity: false,
            showDS: true,
            showEdit: false,
            image: image1,
            com: [],
            qid: '',
            allusers: [],
            communitya: [],
            username: '',
            file: ''
        }
    }

    componentWillMount() {
        this.Auth.fetch('http://localhost:5000/api/viewcommunity', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            console.log("this is community", res)
            this.setState({ com: res })
            // console.log("this is commmun", this.state.com)

        })
            .catch(err => console.log('latest', err))
        const q = this.props.match.params
        this.setState({ qid: q.id })
        // console.log('this is passign', this.state.qid)




        this.Auth.fetch('http://localhost:5000/api/viewcommunity', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            console.log("this is community", res)
            this.setState({ communitya: res })
            console.log("this is what i want", this.state.communitya)

        })
            .catch(err => console.log('commu error in CQ', err))




        this.Auth.fetch('http://localhost:5000/api/viewuser', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            this.setState({ allusers: res })
            // console.log("this is users", this.state.allusers)
            // console.log(this.state)
        })
            .catch(err => console.log('downques', err))




        this.Auth.fetch('http://localhost:5000/api/viewprofile', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            // this.setState({ Profile: res })
            // console.log("this is from api", res)
            this.setState({ username: res.userName })
            console.log("this is current user", this.state.username)

        })
            .catch(err => console.log('Profile', err))






    }

    handleFileChange = event => {
        this.setState({ file: event.target.files[0] })
    }


    addProfileDPHandler = () => {
        var formData = new FormData();

        formData.append('Name', this.state.qid)
        formData.append('profile', this.state.file)
        console.log(formData)
        console.log("thi sis image", this.state.file)

        this.Auth.ifetch('http://localhost:5000/api/communitydp', {
            method: 'POST', body: formData,


        }).then(res => console.log('Edited Community Photo successfully'))
            .catch(err => console.log('Community Image error', err))




        this.Auth.fetch('http://localhost:5000/api/addprofile', {
            method: 'POST', body: JSON.stringify({
                proffesion: this.state.userProfession,
                description: this.state.userDescription,
                location: this.state.userLocation,
                preferedtech: this.state.userTechnology,
                faveditor: this.state.userEditor
            })
        }).then(res => console.log('added info successfully'))
            .catch(err => console.log('add info error', err))



    }



    setquestionHandler = () => {

        this.setState({ question: true });

        this.setState({ answer: false });
    }

    setanswerHandler = () => {

        this.setState({ question: false });

        this.setState({ answer: true });
    }

    showMembersHandler = () => {

        this.setState({ showMembers: true });

        this.setState({ showActivity: false });

        this.setState({ showDS: false });

        this.setState({ showEdit: false });
    }


    showActivityHandler = () => {
        this.setState({ showMembers: false });

        this.setState({ showActivity: true });

        this.setState({ showDS: false });

        this.setState({ showEdit: false });

    }

    showDSHandler = () => {

        this.setState({ showMembers: false });

        this.setState({ showActivity: false });

        this.setState({ showDS: true });

        this.setState({ showEdit: false });

    }

    showEditHandler = () => {

        this.setState({ showMembers: false });

        this.setState({ showActivity: false });

        this.setState({ showDS: false });

        this.setState({ showEdit: true });

    }

    joincommu = (commuid) => {
        // console.log("this is commu id",commuid)
        this.Auth.fetch('http://localhost:5000/api/follow', {
            method: 'POST', body: JSON.stringify({
                cid: commuid
            })
        }).then(res => console.log("Successfully joined", res))
            .catch(err => console.log('Not joined sorry error', err))
    }


    render() {

        let admin

        let tp = this.state.communitya.map(tp1 => {
            if (tp1.Name === this.state.qid) {
                console.log("this is community ", tp1.Name)
                admin = tp1.createdby
            }
        })
        console.log("this is admin of this commu", admin)


        let CAdisplay = null;

        const q = this.props.match.params
        if (this.state.question) {
            CAdisplay = (
                <CQ name={q.id} />
            );
        }

        if (this.state.answer) {
            CAdisplay = (
                <CA />
            );
        }

        let showornot = ''
        if (admin == this.state.username) {
            showornot = (<a href="javascript:void(0);" onClick={this.showEditHandler}>Edit Info</a>)
        }

        let cmemmm = ''
        let checking = ''
        let cmmmmm = this.state.com.map(lat => {

            if (lat.Name === this.state.qid) {
                cmemmm = lat.members.map(l => {

                    if (this.state.username === l) {
                        checking = 'Correct'
                        console.log("this is memeber and same user", l)

                        console.log("this is same user", this.state.username)
                    }
                })
                return (
                    <div>
                        {cmemmm}
                    </div>
                )
            }
        })

        

        let pro = P
        let cm = this.state.com.map(lat => {
            if (lat.Name === this.state.qid) {
                if (lat.profile !== '' && lat.profile !== undefined) {
                    pro = lat.profile
                    // console.log("aa gaya ")
                }
                else {
                    pro = P
                }

                let showfollow = ''
                if (checking === 'Correct') {
                    showfollow = (<Button variant="outlined" size="small" color="primary" style={{marginLeft:-15}}>
                        Following
            </Button>)
                }
                else {
                    showfollow = (<Button variant="outlined" size="small" color="primary" onClick={() => this.joincommu(lat._id)} style={{marginLeft:8}}>
                        Join+
                                </Button>)
                }


                return (<div className="CSidebar">
                    <div className="CUsername">
                        <h3>{lat.Name}</h3>
                        <div className="Badgediv">
                            <Badge pill variant="primary" className="Badges">
                                Platinum
                        </Badge>
                        </div>
                    </div>
                    <div className="CImagediv">
                        <div className="CImage">
                            <img src={pro} />
                        </div>
                        <div className="LogoutBut">
                            {/* <Button variant="outlined" size="small" color="primary" onClick={() => this.joincommu(lat._id)}>
                                Join+
                        </Button> */}
                        {showfollow}
                        </div>
                    </div>
                    <div className="CNav">
                        <a href="javascript:void(0);" onClick={this.showMembersHandler}>Members</a>
                        <a href="javascript:void(0);" onClick={this.showActivityHandler}>Activity</a>
                        <a href="javascript:void(0);" onClick={this.showDSHandler}>About Us</a>
                        {showornot}

                    </div>
                </div>

                )
            }
        })




        let cd = this.state.com.map(lat => {
            if (lat.Name === this.state.qid) {
                return (
                    <div className="developerstory">
                        <div className="DSIMAGEDIV">
                            <img src={pro} />
                        </div>
                        <div className="DSNAMEDIV">
                            <h3>{lat.Name}</h3>
                        </div>
                        <div className="DSDiscription">
                            <p>{lat.description}</p>
                        </div>
                        <div className="DSinfodisplay">
                            <span><b>Location: {lat.location}</b></span>
                        </div>
                        <div className="DSinfodisplay">
                            <span><b>Members:{lat.nom}</b></span>
                        </div>
                        <div className="DSinfodisplay">
                            <span><b>Admin:{lat.createdby}</b></span>
                        </div>
                    </div>

                )
            }
        })

        let mp = ''
        let cmm = this.state.com.map(lat => {

            if (lat.Name === this.state.qid) {
                let cmem = lat.members.map(l => {
                    let pt = this.state.allusers.map(user => {

                        if (user.userName === l) {
                            if (user.profile !== '') {
                                mp = user.profile
                            }
                            else {
                                mp = P
                            }
                            return (user.rep)
                        }

                    }
                    )
                    return (
                        <div className="Userbox">
                            <div className="Imagediv">
                                <div className="Image">
                                    <img src={mp} />
                                </div>
                            </div>
                            <div className="Usernamediv">
                                <div className="username">
                                    <a href="javascript:void(0);"><NavLink to={"/Pro/" + (l)}>{l}</NavLink></a>
                                </div>
                            </div>
                            <div className="Scorediv">
                                <div className="score">
                                    <p>Points: {pt}   </p>
                                </div>
                            </div>
                        </div>
                    )
                })
                return (
                    <div>
                        {cmem}
                    </div>
                )
            }
        })


        return (
            <div>
                <div className="CFirst">
                    <Header />
                </div>
                <div className="CSecond">
                    {cm}
                    <div className="CDisplay">
                        <div className="container">


                            {
                                this.state.showMembers === true ?
                                    <div>
                                        <div className="U_topbar">
                                            <h3>Members</h3>
                                            <input type="search" placeholder="Find Member" /><br />
                                            <hr />
                                        </div>

                                        <div className="Users_div">
                                            {cmm}
                                        </div>

                                    </div> : null

                            }

                            {

                                this.state.showActivity === true ?
                                    <div className="Activity">
                                        <div className="ActivityNav">
                                            <a href="javascript:void(0);" onClick={this.setquestionHandler}>Question</a>
                                            {/* <a href="javascript:void(0);" onClick={this.setanswerHandler}>Answered Question</a> */}
                                        </div>
                                        <div className="ActivityDisplay">
                                            {CAdisplay}
                                        </div>
                                    </div> : null

                            }




                            {
                                this.state.showDS === true ?
                                    <div className="DeveloperStorydiv">
                                        {cd}
                                    </div> : null

                            }



                            {
                                this.state.showEdit === true ?
                                    <div className="CADDINFOMAINDIV">
                                        <form enctype="multipart/form-data">
                                            <div className="CAddInfo">

                                                <div className="CAddR">
                                                    <div className="CAddImageDiv">
                                                        <img src={pro} />
                                                    </div>
                                                    <div className="CAddIB">
                                                        <label for="files" class="btn">Change Profile DP</label>
                                                        <input id="files" type="file" onChange={this.handleFileChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="CSubmitdiv">
                                                <input type="submit" value="Save Profile" onClick={this.addProfileDPHandler} />
                                            </div>
                                        </form>
                                    </div> : null

                            }


                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Community



