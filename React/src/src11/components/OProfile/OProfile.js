import React, { Component } from 'react'
import './OProfile.css'
import Header from '../Header/Header'
import { Badge } from 'react-bootstrap'
import P from '../../Images/1.png'
import DI from '../../Images/DP.png'
import Button from '@material-ui/core/Button'
import AuthService from '../../AuthService/AuthService'




class OProfile extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            question: true,
            answer: false,
            showEdit: false,
            showAddInfo: false,
            showActivity: false,
            showDS: true,
            Proname: '',
            Name: "",
            location: "",
            username: "",
            description: "",
            firstname: '',
            lastname: '',
            Faveditor: "",
            image: '',
            PrefferedTechno: [],
            points: '',
            aos: [],
            img: DI
        }
    }


    componentWillMount() {

        const q = this.props.match.params
        this.setState({ Proname: q.Uname })

        this.Auth.fetch('http://localhost:5000/api//viewotherprofile', {
            method: 'POST', body: JSON.stringify({
                username: q.Uname
            })
        }).then(res => {
            res = res[0]
            console.log("this is what i want ", res)
            this.setState({ aos: res.aos })
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
            // const image1 = require(res.profile)
            // this.setState({image:image1})

        })
            .catch(err => console.log('Profile', err))


    }

    setquestionHandler = () => {

        this.setState({ question: true });

        this.setState({ answer: false });
    }

    setanswerHandler = () => {

        this.setState({ question: false });

        this.setState({ answer: true });
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


    render() {

        let Adisplay = null;

        return (
            <div>
                <div className="OPFirst">
                    <Header />
                </div>
                <div className="OPSecond">
                    <div className="OPSidebar">
                        <div className="OPUsername">
                            <h3>{this.state.username}</h3>
                            <div className="OBadgediv">
                                <Badge pill variant="primary" className="OBadges">
                                    {this.state.badge}
                                </Badge>
                            </div>
                        </div>
                        <div className="OPImagediv">
                            <div className="OPImage">
                                <img src={this.state.img} />

                            </div>
                            <div className="OPPoint">
                                <span>Points:{this.state.points}</span>
                            </div>
                        </div>
                        <div className="OPNav">
                            <a href="javascript:void(0);" onClick={this.showDSHandler}>Developer Story</a>
                        </div>
                    </div>
                    <div className="OPDisplay">
                        <div className="container">



                            {
                                this.state.showDS === true ?
                                    <div className="ODeveloperStorydiv">
                                        <div className="Odeveloperstory">
                                            <div className="ODSIMAGEDIV">
                                                <img src={this.state.img} />
                                            </div>
                                            <div className="ODSNAMEDIV">
                                                <h3>{this.state.firstname} {this.state.lastname}</h3>
                                            </div>
                                            <div className="ODSDiscription">
                                                <p>
                                                    {this.state.description}
                                                </p>
                                            </div>

                                            <div className="ODSinfodisplay">
                                                <span><b>Profession:{this.state.Profession}</b></span>
                                            </div>

                                            <div className="ODSinfodisplay">
                                                <span><b>Location: {this.state.location}</b></span>
                                            </div>
                                            <div className="ODSinfodisplay">
                                                <span><b>Preffered Technology: {this.state.PrefferedTechno}</b></span>
                                            </div>
                                            <div className="ODSinfodisplay">
                                                <span><b>Favourite Editor: {this.state.Faveditor}</b></span>
                                            </div>

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


export default OProfile



