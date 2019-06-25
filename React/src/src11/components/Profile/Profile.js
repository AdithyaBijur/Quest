import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios'
import Header from '../Header/Header';
import { Badge } from 'react-bootstrap';
import P from '../../Images/1.png';
import DI from '../../Images/DP.png';
import Button from '@material-ui/core/Button';
import UQ from './UserQuestion/UserQuestion';
import UA from './UserAnswer/UserAnswer';
import AuthService from '../../AuthService/AuthService';
const image1 = require('../../Images/2.png');


class Profile extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            Profile: [],
            ViewOwnQ: [],
            viewownanswer: [],
            question: true,
            answer: false,
            showEdit: false,
            showAddInfo: false,
            showActivity: false,
            showDS: true,
            Name: "",
            Profession: "",
            description: "",
            location: "",
            PrefferedTechno: '',
            Faveditor: "",
            username: "",
            technology: "",
            image: image1,
            userProfession: '',
            userDescription: '',
            userLocation: '',
            userTechnology: '',
            userEditor: '',
            firstname: '',
            lastname: '',
            rep: '',
            badge: '',
            img: DI,
            file: ''

        };

    }



    componentWillMount() {
        this.Auth.fetch('http://localhost:5000/api/viewprofile', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            // this.setState({ Profile: res })
            console.log("this is from api", res)
            this.setState({ Profession: res.proffession })
            this.setState({ description: res.description })
            this.setState({ location: res.location })
            this.setState({ PrefferedTechno: res.preferedtech })
            this.setState({ Faveditor: res.faveditor })
            this.setState({ username: res.userName })
            this.setState({ firstname: res.firstname })
            this.setState({ lastname: res.lastname })
            this.setState({ points: res.rep })
            this.setState({ badge: res.badge })
            if (res.profile !== '') {
                this.setState({ img: res.profile })
            }
            // console.log(this.state.img)



        })
            .catch(err => console.log('Profile', err))


    }

    handleFileChange = event => {
        this.setState({ file: event.target.files[0] })
    }
    addProfileUserHandler = () => {
        var formData = new FormData();
        formData.append('file', this.state.file)
        console.log(formData)
        console.log("thi sis image", this.state.file)

        this.Auth.ifetch('http://localhost:5000/api/uploadpic', {
            method: 'POST', body: formData,


        }).then(res => console.log('added photo successfully'))
            .catch(err => console.log('add photo error', err))


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

    editProfileuserHandler = () => {

        var formData = new FormData();
        formData.append('file', this.state.file)
        console.log(formData)
        console.log("thi sis image", this.state.file)

        this.Auth.ifetch('http://localhost:5000/api/uploadpic', {
            method: 'POST', body: formData,


        }).then(res => console.log('added photo successfully'))
            .catch(err => console.log('add photo error', err))


        this.Auth.fetch('http://localhost:5000/api/addprofile', {
            method: 'POST', body: JSON.stringify({
                proffesion: this.state.Profession,
                description: this.state.description,
                location: this.state.location,
                preferedtech: this.state.PrefferedTechno,
                faveditor: this.state.Faveditor
            })
        }).then(res => console.log('Edited info successfully'))
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

    showAddInfoHandler = () => {

        this.setState({ showEdit: false });

        this.setState({ showAddInfo: true });

        this.setState({ showActivity: false });

        this.setState({ showDS: false });
    }


    showActivityHandler = () => {
        this.setState({ showEdit: false });

        this.setState({ showAddInfo: false });

        this.setState({ showActivity: true });

        this.setState({ showDS: false });
    }

    showDSHandler = () => {
        this.setState({ showEdit: false });

        this.setState({ showAddInfo: false });

        this.setState({ showActivity: false });

        this.setState({ showDS: true });
    }

    showEditProfileHandler = () => {
        this.setState({ showEdit: true });

        this.setState({ showAddInfo: false });

        this.setState({ showActivity: false });

        this.setState({ showDS: false });
    }

    handleProfessionChange(event) {
        this.setState({ Profession: event.target.value })
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value })
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value })
    }

    handleTechnologyChange(event) {
        this.setState({ PrefferedTechno: event.target.value })
    }

    handleEditorChange(event) {
        this.setState({ Faveditor: event.target.value })
    }

    logout = () => {
        this.Auth.logout()
        this.setState()
    }

    handleChange = (e) => {
        let x = e.target.name

        this.setState(
            {
                [x]: e.target.value

            }

        )
    }

    render() {


        let pd = this.state.Profile.map(prode => {
            return (
                <div className="developerstory">
                    <div className="DSIMAGEDIV">
                        <img src={this.state.img} />
                    </div>
                    <div className="DSNAMEDIV">
                        <h3>{prode.firstname} {prode.lastname}</h3>
                    </div>
                    <div className="DSDiscription">
                        <p>{prode.description}
                        </p>
                    </div>
                    <div className="DSinfodisplay">
                        <span><b>Location: {prode.location}</b></span>
                    </div>
                    <div className="DSinfodisplay">
                        <span><b>Points:{prode.rep}</b></span>
                    </div>

                    <div className="DSinfodisplay">
                        <span><b>Profession: {prode.proffession}</b></span>
                    </div>
                    <div className="DSinfodisplay">
                        <span><b>Preffered Technology: {prode.preferedtech}</b></span>
                    </div>
                    <div className="DSinfodisplay">
                        <span><b>Favourite Editor: {prode.faveditor}</b></span>
                    </div>

                </div>
            )
        })






        let Adisplay = null;


        if (this.state.question) {
            Adisplay = (
                <UQ />
            );
        }

        if (this.state.answer) {
            Adisplay = (
                <UA />
            );
        }

        return (
            <div>
                <div className="PFirst">
                    <Header />
                </div>
                <div className="PSecond">
                    {/* {ps} */}
                    <div className="PSidebar">
                        <div className="PUsername">
                            <h3>{this.state.username}</h3>
                            <div className="Badgediv">
                                <Badge pill variant="primary" className="Badges">
                                    {this.state.badge}
                                </Badge>
                            </div>
                        </div>
                        <div className="PImagediv">
                            <div className="PImage">
                                <img src={this.state.img} />
                            </div>
                            <a href="/"> <div className="LogoutBut">
                                <Button variant="outlined" onClick={this.logout} size="small" color="primary">
                                    Logout
                        </Button>
                            </div></a>
                        </div>
                        <div className="PNav">
                            <a href="javascript:void(0);" onClick={this.showAddInfoHandler}>Add Information</a>
                            <a href="javascript:void(0);" onClick={this.showActivityHandler}>Activity</a>
                            <a href="javascript:void(0);" onClick={this.showDSHandler}>Developer Story</a>
                            <a href="javascript:void(0);" onClick={this.showEditProfileHandler}>Edit Profile</a>
                        </div>
                    </div>
                    <div className="PDisplay">
                        <div className="container">



                            {

                                this.state.showActivity === true ?
                                    <div className="Activity">
                                        <div className="ActivityNav">
                                            <a href="javascript:void(0);" onClick={this.setquestionHandler}>Questions</a>
                                            <a href="javascript:void(0);" onClick={this.setanswerHandler}>Answers</a>
                                        </div>
                                        <div className="ActivityDisplay">
                                            {Adisplay}
                                        </div>
                                    </div> : null

                            }



                            {
                                this.state.showAddInfo === true ?
                                    <div className="ADDINFOMAINDIV">
                                        <form enctype="multipart/form-data">
                                            <div className="AddInfo">

                                                <div className="AddL">
                                                    <div className="AddImageDiv">
                                                        <img src={this.state.img} />
                                                    </div>
                                                    <div className="AddIB">
                                                        <label for="files" class="btn">Add Profile Page</label>
                                                        <input id="files" type="file" onChange={this.handleFileChange} />
                                                    </div>
                                                </div>
                                                <div className="AddR">
                                                    <div className="AddIF">
                                                        <label>Profession</label>
                                                        <input type="text" placeholder="e.g Student, Employee, Business" required name="userProfession" onChange={this.handleChange} />
                                                        <label>Description</label>
                                                        <textarea placeholder="Write something about you........" required name="userDescription" onChange={this.handleChange}></textarea>
                                                        <label>Current Location</label>
                                                        <input type="text" placeholder="Where you live" required name="userLocation" onChange={this.handleChange} />
                                                        <label>Prefered Technologies</label>
                                                        <input type="text" placeholder="e.g JavaScript, C, C#, Python" required name="userTechnology" onChange={this.handleChange} />
                                                        <label>Favorite editor</label>
                                                        <input type="text" placeholder="e.g Sublime text, Notepad++" required name="userEditor" onChange={this.handleChange} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Submitdiv">
                                                <input type="submit" value="Save Profile" onClick={this.addProfileUserHandler} />
                                            </div>
                                        </form>
                                    </div> : null

                            }


                            {
                                this.state.showDS === true ?
                                    <div className="DeveloperStorydiv">
                                        {/* {pd} */}

                                        <div className="developerstory">
                                            <div className="DSIMAGEDIV">
                                                <img src={this.state.img} />
                                            </div>
                                            <div className="DSNAMEDIV">
                                                <h3>{this.state.firstname} {this.state.lastname}</h3>
                                            </div>
                                            <div className="DSDiscription">
                                                <p>{this.state.description}
                                                </p>
                                            </div>
                                            <div className="DSinfodisplay">
                                                <span><b>Location: {this.state.location}</b></span>
                                            </div>
                                            <div className="DSinfodisplay">
                                                <span><b>Points:{this.state.points}</b></span>
                                            </div>

                                            <div className="DSinfodisplay">
                                                <span><b>Profession: {this.state.Profession}</b></span>
                                            </div>
                                            <div className="DSinfodisplay">
                                                <span><b>Preffered Technology: {this.state.PrefferedTechno}</b></span>
                                            </div>
                                            <div className="DSinfodisplay">
                                                <span><b>Favourite Editor: {this.state.Faveditor}</b></span>
                                            </div>

                                        </div>

                                    </div> : null

                            }



                            {
                                this.state.showEdit === true ?
                                    <div className="EditProfileDiv">
                                        <div className="editprofile">
                                            <form>
                                                <div className="AddInfo">

                                                    <div className="AddL">
                                                        <div className="EAddImageDiv">
                                                            <img src={this.state.img} />
                                                        </div>
                                                        <div className="AddIB">
                                                            <label for="files" class="btn" >Chnage Picture</label>
                                                            <input id="files" type="file" required name="file" onChange={this.handleFileChange} />
                                                        </div>
                                                    </div>
                                                    <div className="AddR">
                                                        <div className="AddIF">
                                                            <label>Profession</label>
                                                            <input type="text" name="userProfession" onClick={this.display} value={this.state.Profession} onChange={this.handleProfessionChange.bind(this)} />
                                                            <label>Description</label>
                                                            <textarea name="userDescription" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}></textarea>

                                                            <label>Current Location</label>
                                                            <input type="text" name="userLocation" value={this.state.location} onChange={this.handleLocationChange.bind(this)} />
                                                            <label>Prefered Technologies</label>
                                                            <input type="text" name="userTechnology" value={this.state.PrefferedTechno} onChange={this.handleTechnologyChange.bind(this)} />
                                                            <label>Favorite editor</label>
                                                            <input type="text" name="UserEditor" value={this.state.Faveditor} onChange={this.handleEditorChange.bind(this)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Submitdiv">
                                                    <input type="submit" value="Save Changes" onClick={this.editProfileuserHandler} />
                                                </div>
                                            </form>
                                        </div>
                                    </div> : null
                            }



                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Profile



