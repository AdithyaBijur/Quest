import React, { Component } from 'react';
import './VerifyAnswer.css';
import AuthService from '../../../AuthService/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from "../../Popup/Editor";
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class VerifyAnswer extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            text: '',
            notags: '',
            question: {},
            answers: [],
            title: ''


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scriptLoaded()
    }

    componentDidMount() {

        this.Auth.fetch('http://localhost:5000/api/viewqa', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {
            let ques = res[0]
            res.shift()
            this.setState({ title: ques.title })
            console.log("this is title", ques.title)
            this.setState({ question: ques, answers: res })

        })
            .catch(err => console.log('latest', err))
        const script = document.createElement("script");
        script.src = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=py&amp;skin=sunburst";
        script.async = true;


        document.body.appendChild(script);
    }
    scriptLoaded() {

        window.PR.prettyPrint();
        console.log('eth')
    }

    accept = (ansid) => {
        console.log("this is commu id", ansid)
        this.Auth.fetch('http://localhost:5000/api/acceptanswer', {
            method: 'POST', body: JSON.stringify({
                aid: ansid
            })
        }).then(res => console.log("Successfully Accepted", res))
            .catch(err => console.log('Accept answer error', err))
    }




    render() {
        console.log('answers', this.state.answers)
        var ques = ''
        if (this.state.question.tags) {
            ques = this.state.question.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            var tags = this.state.question.tags.map(t => { return (<a href="">{t}</a>) })
        }

        let ans = this.state.answers.map(a => {
            a.answer = a.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            return (

                <div className="VAAnsdiv">
                    <div className="VAansp">
                        <p>

                            {ReactHtmlParser(a.answer)}
                        </p>
                        <div className="VAans">

                            <p>Answered by:</p><a href="" className="VAansu">{a.creatorname}</a>
                            <Button variant="outline-primary" className="VAANSBUTT" onClick={() => this.accept(a._id)}>Accept Answer</Button>

                        </div><br />

                    </div>
                    <hr />
                </div>


            )
        })


        return (


            <div className="VAMAINTOPDIV">
                <div className="VAQT">
                    <div className="VAquestinfo">
                        <div className="VAqasecdiv">
                            {/* <div className="VAqu"><a href="">{this.state.title}</a></div> */}
                            <div className="VAqu"><a href="">{this.state.title}</a></div>
                            <div className="VAqu"><a href="">{ReactHtmlParser(ques)}</a></div>
                            <div className="VAta">{tags}</div>
                            <div className="VAas"><p>Asked by:</p><a href="">{this.state.question.creatorname}</a></div>
                        </div>
                    </div>

                </div>

                <hr />
                <p className="VAanslabel">ANSWERS</p>
                <hr className="hrtag" />
                {ans}

            </div>
        );
    }
}




export default VerifyAnswer