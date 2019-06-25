import React, { Component } from 'react';
import './UserAnswer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import AuthService from '../../../AuthService/AuthService';
import TextField from '@material-ui/core/TextField';
import 'code-prettify'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
library.add(faThumbsUp, faThumbsDown);
class UserAnswer extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            ViewOwnA: [],
            alert: null,
        };

    }


    componentDidMount() {

        this.Auth.fetch('http://localhost:5000/api/viewownanswer', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            console.log("this is view own answer", res)
            this.setState({ ViewOwnA: res })
        })
            .catch(err => console.log('view own answer error', err))



        const script = document.createElement("script");
        script.src = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=py&amp;skin=sunburst";
        script.async = true;


        document.body.appendChild(script);

    }
    update = () => {

        this.Auth.fetch('http://localhost:5000/api/viewownanswer', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            console.log("this is view own answer", res)
            this.setState({ ViewOwnA: res })
        })
            .catch(err => console.log('view own answer error', err))
    }
    deletepop = (ansid) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={() => this.deleteans(ansid)}
                onCancel={() => this.hideAlert()}
            >
                You will not be able to recover this Question!
    </SweetAlert>)

        this.setState({
            alert: getAlert()
        });

    }
    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
            alert: null
        });
        this.setState()
    }

    deleteans = (ansid) => {
        this.hideAlert()
        console.log("this is commu id", ansid)
        this.Auth.fetch('http://localhost:5000/api/deleteanswer', {
            method: 'POST', body: JSON.stringify({
                aid: ansid
            })
        }).then(res => {
            this.update()
            console.log("Successfully deleted", res)
            this.update()

        })
            .catch(err => {
                this.update()
                console.log('Delete answer error', err)
                this.update()
            })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scriptLoaded()
    }


    scriptLoaded() {

        window.PR.prettyPrint();
        console.log('eth')
    }

    render() {

        // console.log('This is user own answer', this.state.ViewOwnA)
        let prouoa = this.state.ViewOwnA.map(prooa => {
            console.log(prooa.answer)
            console.log("this is queston", prooa.question)
            prooa.answer = prooa.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            if (prooa.question !== undefined) {
                prooa.question = prooa.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            }
            return (
                <div className="MAINTOPDIV">
                    <div className="QT">
                        <div className="questinfo">
                            <div className="qasecdiv">
                                <div className="qu"><a href="">{prooa.title}</a></div>
                                <div className="qu"><a href="" style={{ fontWeight: 450 }}>{ReactHtmlParser(prooa.question)}</a></div>
                                {/* <div className="ta"><a href="">Programming</a><a href="">web</a><a href="">Anything</a></div> */}
                                <div className="as"><p>Asked by:</p><a href="">{prooa.askedby}</a></div>
                            </div>
                        </div>
                        {/* <div className="Useraction">
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
                        </div> */}
                    </div>

                    <hr />
                    <p className="anslabel">ANSWER</p>
                    <div className="Ansdiv">
                        <div className="ansp">
                            <p> {ReactHtmlParser(prooa.answer)}</p>
                            <div className="ans">

                                <p>Answered by:</p><a href="" className="ansu">{prooa.creatorname}</a>
                                <Button variant="outline-primary" className="ANSB" onClick={() => this.deletepop(prooa._id)}>Delete Answer</Button>
                                {this.state.alert}
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