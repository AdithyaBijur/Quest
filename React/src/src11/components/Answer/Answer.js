import React, { Component } from 'react';
import './quill.snow.css'
import AuthService from '../../AuthService/AuthService'
import './Answer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from "../Popup/Editor";
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import 'code-prettify'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class Answer extends Component {
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


        const script = document.createElement("script");
        script.src = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=py&amp;skin=sunburst";
        script.async = true;


        document.body.appendChild(script);



    }

    scriptLoaded() {

        window.PR.prettyPrint();
        console.log('eth')
    }


    ansSubmit = () => {
        this.scriptLoaded()
        this.Auth.fetch('http://localhost:5000/api/addanswer', {
            method: 'POST', body: JSON.stringify({

                qid: this.props.qid,
                answer: this.state.text
            })
        }).then(res => console.log("anssubmit", res))
            .catch(err => console.log('anssubmit', err))
    }

    upans = (aid) => {
        this.Auth.fetch('http://localhost:5000/api/editupvotes', {
            method: 'POST', body: JSON.stringify({

                aid: aid
            })
        }).then(res => console.log("upvoted ans", res))
            .catch(err => console.log('upvoted ans', err))
    }
    downans = (aid) => {
        this.Auth.fetch('http://localhost:5000/api/editdownvotes', {
            method: 'POST', body: JSON.stringify({

                aid: aid
            })
        }).then(res => console.log("downvoted ans", res))
            .catch(err => console.log('downvoted ans', err))
    }


    upques = () => {
        this.Auth.fetch('http://localhost:5000/api/editupvotesquestion', {
            method: 'POST', body: JSON.stringify({

                qid: this.props.qid
            })
        }).then(res => console.log("upvoted ques", res))
            .catch(err => console.log('upvoted ques', err))
    }
    downques = () => {
        this.Auth.fetch('http://localhost:5000/api/editdownvotesquestion', {
            method: 'POST', body: JSON.stringify({

                qid: this.props.qid


            })
        }).then(res => console.log("downvoted ques", res))
            .catch(err => console.log('downvoted ques', err))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scriptLoaded()
    }

    handleChangeEditor = (value, delta, source, editor) => {
        console.log(value)
        this.setState({ text: value })
        this.setState({ notags: editor.getText(value) })

    }
    render() {


        console.log(this.state)
        let ques
        if (this.state.question.question !== undefined) {
            var tags = this.state.question.tags.map(l => { return (<a href="">{l}</a>) })
            ques = this.state.question.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
        }
        let ans = this.state.answers.map(a => {
            console.log(a.answer)
            a.answer = a.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')

            //a.answer = a.answer.replace('</pre>', '>')
            return (
                <div className="Ansdiv">
                    <div className="ansp">
                        <div style={{ padding: 20 }}>
                            {ReactHtmlParser(a.answer)}
                        </div>

                        <div className="ans">

                            <p>Answered by:</p><a href="" className="ansu">{a.creatorname}</a>
                            <a href="#"><FontAwesomeIcon icon="thumbs-up" className="iconsty anslike" tabindex="1" onClick={() => this.upans(a._id)} /></a>
                            <a href="#" className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" onClick={() => this.downans(a._id)} /></a>

                        </div><br />

                    </div>
                    <hr />
                </div>

            )
        })
        return (

            <div className="MAINTOPDIV" onClick={this.scriptLoaded}>
                <div className="QT">
                    <div className="questinfo">
                        <div className="qasecdiv">
                            <div className="qu"><a href="">{this.state.question.title}</a></div>
                            <div className="qu"> {ReactHtmlParser(ques)}</div>
                            <div className="ta">{tags}</div>
                            <div className="as"><p>Ask by:</p><a href="">{this.state.question.creatorname}</a></div>
                        </div>
                    </div>
                    <div className="Useraction">
                        <div className="upvotediv">
                            <div className="like">
                                <a href="#"><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" onClick={this.upques} /></a>
                                <a href="#" className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" onClick={this.downques} /></a>
                                {/* <p>Votes</p> */}
                            </div>
                        </div>
                        <div className="submitdiv">
                            <a href="#useransid" className="addans"><button>Add Answer</button></a>
                        </div>
                    </div>
                </div>

                <hr />
                <p className="anslabel">ANSWERS</p>
                <hr className="hrtag" />
                {ans}

                <div className="useransdiv" id="useransid" >
                    <form className='formdiv' noValidate autoComplete="off">

                        <Editor placeholder={'Write Something...'} text={this.state.text} onChange={this.handleChangeEditor} />

                        <Button variant="outline-primary" className='submit' onClick={this.ansSubmit} className="ANSBUTT">Submit Question</Button>
                    </form>
                </div></div>

        );
    }
}

export default Answer