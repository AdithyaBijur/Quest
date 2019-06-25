import React, { Component } from 'react';
import './Header.css';
// import SigupSignin from '../Popup/SignupSignin';
import Searcher from '../Search/Search'
import AuthService from '../../AuthService/AuthService'
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap'
class Header extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            username: '',
            request: true,
            qanda: false,
            history: false,
            noti: false,
            resultshare: [],
            resultQA: [],
            resultreps: [],
            shrdque: [],
            shrdq: []
        };

    }


    componentWillMount() {
        this.Auth.fetch('http://localhost:5000/api/viewprofile', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            this.setState({ username: res.userName })

        })
            .catch(err => console.log('Profile', err))


        this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'reps'
            })

        }).then(res => {
            this.setState({ resultreps: res })
            // console.log("Reps Notification Content", res)
        })
            .catch(err => console.log('Reps History Error', err))



        this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'request'
            })
        }).then(res => {
            this.setState({ resultshare: res })
            // console.log("Request Notification COntent", res)
        })
            .catch(err => console.log('Request Notification Error', err))



        this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'answer'
            })
        }).then(res => {
            this.setState({ resultQA: res })
            // console.log("Answer Notification Content", this.state.resultQA)
        })
            .catch(err => console.log('Answer Notification Error', err))



        // this.Auth.fetch('http://localhost:5000/api/notification', {
        //     method: 'POST', body: JSON.stringify({
        //         mod: 'shared'
        //     })
        // }).then(res => {
        //     var tp = []
        //     if (this.state.resultQA !== []) {
        //         var ttp = this.state.resultQA
        //         tp = [...ttp]
        //     }

        //     tp = [...tp, ...res]
        //     this.setState({ resultQA: tp })
        //     console.log("Shared NOtification Content", res)
        // })
        //     .catch(err => console.log('Shared Notification Error', err))



        this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'shared'
            })
        }).then(res => {
            this.setState({ shrdq: res })
            // console.log("shared only Notification", this.state.shrdq)
        })
            .catch(err => console.log('Shared Notification Error', err))



        this.Auth.fetch('http://localhost:5000/api/follow', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            var tp = [...this.state.resultQA]
            tp = [...tp, ...res]
            this.setState({ resultQA: tp })
        })
            .catch(err => console.log('nothing', err))



        this.Auth.fetch('http://localhost:5000/api/sharedwithme', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            // console.log("shared Questions", res)
            this.setState({ shrdque: res })
            // console.log("This is isisssisisisisisisisisisisisisisis", this.state.shrdque)
        })
            .catch(err => console.log('Shared Ques Noti', err))



    }

    setNotiHandler = () => {
        const tp = !this.state.noti
        this.setState({ noti: tp });
    }


    setReqHandler = () => {
        this.setState({ request: true });

        this.setState({ qanda: false });

        this.setState({ history: false });

    }

    setQaHandler = () => {
        this.setState({ request: false });

        this.setState({ qanda: true });

        this.setState({ history: false });

    }

    setHisHandler = () => {
        this.setState({ request: false });

        this.setState({ qanda: false });

        this.setState({ history: true });

    }


    acceptReq = (rqid) => {
        this.Auth.fetch('http://localhost:5000/api/acceptreq', {
            method: 'POST', body: JSON.stringify({
                rid: rqid,
                status: 1
            })
        }).then(res => {
            console.log("success")
            this.setState()
        })
            .catch(err => console.log('Profile', err))

    }

    rejectReq = (rqid) => {

        this.Auth.fetch('http://localhost:5000/api/acceptreq', {
            method: 'POST', body: JSON.stringify({
                rid: rqid,
                status: 0
            })
        }).then(res => {
            console.log("successfully rejected")
            this.setState()
        })
            .catch(err => console.log('Profile', err))

    }


    render() {

        let shrinfo = ''
        // console.log("this is only shared info",this.state.shrdq)
        if (this.state.shrdq.length > 0) {
            shrinfo = this.state.shrdq.map(s1 => {
                return (<div className="actualcontent">
                    <span style={{ fontWeight: 550 }}><NavLink to={"/Ques/" + (s1.qid)} style={{ textDecoration: 'none', color: 'black' }}>{s1.msg}</NavLink></span><br />
                </div>)
            })
        }

        let hist = ''
        // console.log('Reps COntenttttttttttttttttttttttttttt', this.state.resultreps)
        if (this.state.resultreps.length > 0) {
            hist = this.state.resultreps.map(h1 => {
                return (<div className="actualcontent">
                    <span>{h1.msg}</span><br />
                </div>)
            })
        }

        let ana = ''
        // console.log("QAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.state.resultQA)
        if (this.state.resultQA.length > 0) {
            ana = this.state.resultQA.map(anan1 => {
                return (<div className="actualcontent">
                    <span><NavLink to={"/Ques/" + (anan1.qid)} style={{ textDecoration: 'none', color: 'black' }}>{anan1.msg}</NavLink></span>
                </div>)

            })
        }
        let re = ''
        if (this.state.resultshare.length > 0) {
            re = this.state.resultshare.map(r1 => {
                return (<div className="actualcontent">
                    <span>The request from user {r1.sentby} for  {r1.name} Community</span><br />
                    <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }} onClick={() => { this.acceptReq(r1._id) }}>Accept</Button>
                    <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }} onClick={() => { this.rejectReq(r1._id) }}>Reject</Button>
                </div>)

            })
        }
        let user = ''
        if (this.state.username === '') {
            user = <a href="javascript:void(0);"><NavLink to="/Login" className="LRNL">Login or Register</NavLink></a>

        }
        else {
            user = <a href="javascript:void(0);" className="LRNL" style={{ color: 'white', fontWeight: 650 }} >Welcome {this.state.username}</a>

        }
        return (
            <header className="toolbar">
                <nav className="nevigation_menu">
                    <div className="logo_style">
                        <a href="javascript:void(0);">Quest</a>
                    </div>

                    <Searcher></Searcher>

                    <div className="lists">
                        <div className="flists">
                            <div className="fst">
                                <li><NavLink to="/"><a href="javascript:void(0);">Home</a></NavLink></li>
                            </div>
                            <div className="snd">
                                <li><a href="javascript:void(0);" onClick={this.setNotiHandler}>Notification</a></li>
                            </div>
                            <div className="trd">
                                <li><NavLink to="/Profile"><a href="javascript:void(0);">Profile</a></NavLink></li>
                            </div>
                        </div>

                        {
                            this.state.noti === true ?
                                <div className="boxdown">
                                    <div className="dropmenu">
                                        <div className="fstmenu">
                                            <a href="javascript:void(0);" onClick={this.setReqHandler}>Requests</a>
                                        </div>
                                        <div className="sndmenu">
                                            <a href="javascript:void(0);" onClick={this.setQaHandler}>Q & A</a>
                                        </div>
                                        <div className="trdmenu">
                                            <a href="javascript:void(0);" onClick={this.setHisHandler}>Your History</a>
                                        </div>
                                    </div>


                                    <div className="contentofnoti">

                                        {
                                            this.state.request === true ?
                                                <div className="con">
                                                    {re}

                                                </div> : null
                                        }


                                        {
                                            this.state.qanda === true ?
                                                <div className="con">
                                                    {shrinfo}
                                                    {ana}

                                                </div> : null

                                        }


                                        {
                                            this.state.history === true ?
                                                <div className="con">
                                                    {hist}

                                                </div> : null
                                        }

                                    </div>



                                </div> : null
                        }

                    </div>
                    <div className="login_reg">
                        {user}
                        {/* <a href="#"><NavLink to="/Login" className="LRNL">Login or Register</NavLink></a> */}
                        {/* <a href="#" variant="outlined" color="primary" onClick={this.handleClickOpen}>Login or Register  </a>  */}
                        {/* <SigupSignin /> */}
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header