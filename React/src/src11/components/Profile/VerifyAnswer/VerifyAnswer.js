import React, { Component } from 'react';
import './VerifyAnswer.css';
import AuthService from '../../../AuthService/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from "../../Popup/Editor";
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
class VerifyAnswer extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            text: '',
            notags: '',
            question: {},
            answers: [],


        }
    }

    componentDidMount() {

        this.Auth.fetch('http://localhost:5000/api/viewqa', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {
            let ques = res[0]
            res.shift()

            this.setState({ question: ques, answers: res })

        })
            .catch(err => console.log('latest', err))
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


        let ans = this.state.answers.map(a => {
            a.answer = a.answer.replace('<pre class="ql-syntax" spellcheck="false">')
            a.answer = a.answer.replace('</pre>')
            return (

                <div className="VAAnsdiv">
                    <div className="VAansp">
                        <p>

                            {a.answer}
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
                            <div className="VAqu"><a href="">{this.state.question.question}</a></div>
                            <div className="VAta"><a href="">{this.props.qid}</a><a href="">web</a><a href="">Anything</a></div>
                            <div className="VAas"><p>Ask by:</p><a href="">{this.state.question.creatorname}</a></div>
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