import React, { Component } from 'react';
import './UserAnswer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import AuthService from '../../../AuthService/AuthService';
import TextField from '@material-ui/core/TextField';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
library.add(faThumbsUp, faThumbsDown);
class UserAnswer extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            ViewOwnA: []
        };

    }


    componentWillMount() {

        this.Auth.fetch('http://localhost:5000/api/viewownanswer', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            console.log("this is view own answer", res)
            this.setState({ ViewOwnA: res })
        })
            .catch(err => console.log('view own answer error', err))

    }


    deleteans = (ansid) => {
        console.log("this is commu id",ansid)
        this.Auth.fetch('http://localhost:5000/api/deleteanswer', {
            method: 'POST', body: JSON.stringify({
                aid: ansid
            })
        }).then(res => console.log("Successfully deleted", res))
            .catch(err => console.log('Delete answer error', err))
    }



    render() {

        // console.log('This is user own answer', this.state.ViewOwnA)
        let prouoa = this.state.ViewOwnA.map(prooa => {
            return (
                <div className="MAINTOPDIV">
                    <div className="QT">
                        <div className="questinfo">
                            <div className="qasecdiv">
                            <div className="qu"><a href="">{prooa.title}</a></div>
                                <div className="qu"><a href="">{prooa.question}</a></div>
                                <div className="ta"><a href="">Programming</a><a href="">web</a><a href="">Anything</a></div>
                                <div className="as"><p>Ask by:</p><a href="">{prooa.askedby}</a></div>
                            </div>
                        </div>
                        <div className="Useraction">
                            <div className="upvotediv">
                                <div className="like">
                                    <a><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" /></a>
                                    <p>{prooa.upvotes}</p>
                                </div>
                            </div>
                            <div className="Psubmitdiv">
                                <a className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" /></a>
                                <p>{prooa.downvotes}</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <p className="anslabel">ANSWER</p>
                    <div className="Ansdiv">
                        <div className="ansp">
                            <p> {prooa.answer}</p>
                            <div className="ans">

                                <p>Answered by:</p><a href="" className="ansu">{prooa.creatorname}</a>
                                <Button variant="outline-primary" className="ANSB" onClick={() => this.deleteans(prooa._id)}>Delete Answer</Button>
                            </div><br />

                        </div>
                    </div>

                </div>





            )
        })

        return (
            <div className="UAMAINDIV">
                {prouoa}
               

            </div>
        );
    }
}


export default UserAnswer