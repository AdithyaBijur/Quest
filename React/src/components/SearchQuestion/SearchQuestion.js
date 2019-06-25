import React, { Component } from 'react'
import './SearchQuestion.css'
import '../../First.css'
import AuthService from '../../AuthService/AuthService';
import { Button } from 'react-bootstrap'
import Header from '../Header/Header';
import Selector from '../Selector/Selector';
import Editor from '../Popup/Editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class SearchQuestion extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            text: '',
            latest: [],
            most: [],
            notags: '',
            question: {},
            answers: [],
            que: '',
            qid: ''
        }
    }


    componentDidMount() {

        const q = this.props.match.params
        this.setState({ que: q.Qid })
        // console.log('this is passign question', q.Qid)
        // console.log('inside')

        this.Auth.fetch('http://localhost:5000/api/viewqa', {
            method: 'POST', body: JSON.stringify({
                qid: q.Qid
            })
        }).then(res => {
            let ques = res[0]
            res.shift()
            this.setState({ question: ques, answers: res })
            // console.log("aa ", res)

        })
            .catch(err => console.log('Search question', err))

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



    ansSubmit = () => {
        const q = this.props.match.params
        this.Auth.fetch('http://localhost:5000/api/addanswer', {
            method: 'POST', body: JSON.stringify({

                qid: q.Qid,
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
        }).then(res => console.log("upvoted q", res))
            .catch(err => console.log('upvoted q', err))
    }
    downans = (aid) => {
        this.Auth.fetch('http://localhost:5000/api/editdownvotes', {
            method: 'POST', body: JSON.stringify({

                aid: aid
            })
        }).then(res => console.log("downvoted q", res))
            .catch(err => console.log('downvoted q', err))
    }


    upques = (aid) => {
        const q = this.props.match.params
        this.Auth.fetch('http://localhost:5000/api/editupvotesquestion', {
            method: 'POST', body: JSON.stringify({

                qid: q
            })
        }).then(res => console.log("upvoted ans", res))
            .catch(err => console.log('upvoted ans', err))
    }
    downques = (aid) => {
        const q = this.props.match.params
        this.Auth.fetch('http://localhost:5000/api/editdownvotesquestion', {
            method: 'POST', body: JSON.stringify({

                qid: q


            })
        }).then(res => console.log("downvoted ans", res))
            .catch(err => console.log('downvoted ans', err))
    }



    handleChangeEditor = (value, delta, source, editor) => {
        console.log(value)
        this.setState({ text: value })
        this.setState({ notags: editor.getText(value) })

    }
    render() {
        // console.log('this is state', this.state)
        let ques = ''
        if (this.state.question.question !== undefined) {
            var tags = this.state.question.tags.map(l => { return (<a href="">{l}</a>) })
            ques = this.state.question.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
        }
        let ans = this.state.answers.map(a => {


            let acc = ''
            if (a.accepted === true) {
                if (a.verified === true) {
                    acc = (<div className="AcceptedDiv">
                        <a href="javascript:void(0);"><FontAwesomeIcon icon="check-circle" className="checkedans" tabindex="1" /></a>
                        <span>Verified By Admin</span>
                    </div>)
                }
                else {
                    acc = (<div className="AcceptedDiv">
                        <a href="javascript:void(0);"><FontAwesomeIcon icon="check-circle" className="checkedans" tabindex="1" /></a>
                    </div>)
                }
            }
            else {
                if (a.verified === true) {

                    acc = (<div className="AcceptedDiv">
                        <span>Verified By Admin</span>
                    </div>)

                }
            }


            a.answer = a.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            return (
                <div className="Ansdiv">
                    {acc}
                    <div className="ansp">
                        <p>
                            {ReactHtmlParser(a.answer)}
                        </p>
                        <div className="ans">

                            <p>Answered by:</p><a href="" className="ansu">{a.creatorname}</a>
                            <a href="#"><FontAwesomeIcon icon="thumbs-up" className="iconsty anslike" tabindex="1" onClick={() => this.upans(a._id)} /><span style={{ color: 'black', marginLeft: 5 }}>{a.upvotes}</span></a>
                            <a href="#" className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" onClick={() => this.downans(a._id)} /><span style={{ color: 'black', marginLeft: 5 }}>{a.downvotes}</span></a>
                        </div><br />

                    </div>
                    <hr />
                </div>

            )
        })
        return (
            <div>
                <div className="First">
                    <Header />
                </div>
                <div className="Second">
                    <Selector />
                </div>
                <div className="Third">
                    <div className="MAINTOPDIV" >
                        <div className="QT">
                            <div className="questinfo">
                                <div className="qasecdiv">
                                    <div className="qu"><a href="" >{this.state.question.title}</a></div>
                                    <div className="qu"><a href="" style={{ fontWeight: 450 }}>{ReactHtmlParser(ques)}</a></div>
                                    <div className="ta">{tags}</div>
                                    <div className="as"><p>Ask by:</p><a href="">{this.state.question.creatorname}</a></div>
                                </div>
                            </div>
                            <div className="Useraction">
                                <div className="upvotediv">
                                    <div className="like">
                                        <a href="#"><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" onClick={this.upques} /><span style={{ color: 'black', marginLeft: 5 }}>{this.state.question.upvotes}</span></a>
                                        <a href="#" className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" onClick={this.upques} /><span style={{ color: 'black', marginLeft: 5 }}>{this.state.question.downvotes}</span></a>
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
                        </div>
                    </div>
                </div>
            </div>


        );
    }







}

export default SearchQuestion