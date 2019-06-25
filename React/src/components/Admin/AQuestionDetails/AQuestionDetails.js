import React, { Component } from "react";
import './AQuestionDetails.css';
import AuthService from '../../../AuthService/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
const style = {
    paddingTop: "4px",
    fontSize: "14px",
    paddingBottom: "4px",
    // marginLeft: "-70px",
    marginTop: "15px",
    float: "right",
    marginRight: "20px"

}
class AQuestionDetails extends Component {
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
        console.log('inside')


        this.Auth.fetch('http://localhost:5000/api/viewanswersadmin', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {
            let ques = res[0]
            res.shift()

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scriptLoaded()
    }
    approve = (aid) => {
        console.log(aid)
        this.Auth.fetch('http://localhost:5000/api/verifyanswer', {
            method: 'POST', body: JSON.stringify({
                aid: aid
            })
        }).then(res => {

            console.log('approved')
            this.setState()

        })
            .catch(err => console.log('approve', err))

    }
    delete = (aid) => {
        console.log(aid)
        this.Auth.fetch('http://localhost:5000/api/deleteansweradmin', {
            method: 'POST', body: JSON.stringify({
                aid: aid
            })
        }).then(res => {

            console.log('deleted')
            this.setState()

        })
            .catch(err => console.log('del', err))

    }
    deleteq = () => {
        this.Auth.fetch('http://localhost:5000/api/adminquestion', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {

            console.log('deleted ques')
            this.setState()

        })
            .catch(err => console.log('delques', err))
    }


    render() {
        let ques = ''
        let tags = ''
        if (this.state.question.question !== undefined) {
            ques = this.state.question.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            tags = this.state.question.tags.map(t => { return (<a href="">{t}</a>) })
        }
        let ans = this.state.answers.map(a => {
            console.log(a.answer)
            a.answer = a.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            return (<div className="AAnsdiv">
                <div className="Aansp">

                    {ReactHtmlParser(a.answer)}

                    <div className="Aans">

                        <p>Answered by:</p><a href="" className="Aansu">{a.creatorname}</a>
                        <Button variant="outline-primary" style={style} onClick={() => this.approve(a._id)}>APPROVE ANSWER</Button>
                        <Button variant="outline-primary" style={style} onClick={() => this.delete(a._id)}>DELETE ANSWER</Button>
                    </div><br />

                </div>
                <hr /></div>)
        })
        return (
            <div className="AMAINTOPDIV" >
                <div className="AQT">
                    <div className="Aquestinfo">
                        <div className="Aqasecdiv">
                            <div className="Aqu"><a href="">{this.state.question.title}</a></div>
                            <div className="Aqu"><a href="" style={{ fontWeight: 450 }}>{ReactHtmlParser(ques)}</a></div>
                            <div className="Ata">{tags}</div>
                            <div className="Aas"><p>Asked by:</p><a href="">{this.state.question.creatorname}</a></div>
                            <Button variant="outline-primary" style={style} onClick={this.deleteq}>DELETE QUESTION</Button>
                        </div>
                    </div>
                </div>

                <hr />
                <p className="Aanslabel">ANSWERS</p>
                <hr className="hrtag" />
                {ans}
            </div>
        );
    }
}

export default AQuestionDetails