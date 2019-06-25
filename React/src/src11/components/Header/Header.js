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
            resultshare:[],
            resultQA:[],
            resultreps:[]
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
                    mod:'reps'
            })
        }).then(res => {
            this.setState({resultreps:res})
        })
            .catch(err => console.log('Profile', err))


        
            this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                    mod:'request'
            })
        }).then(res => {
            this.setState({resultshare:res})
            console.log("this is chu",res)
        })
            .catch(err => console.log('Profile this is', err))


            
            this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                    mod:'answer'
            })
        }).then(res => {
            this.setState({resultQA:res})
            console.log("this is answer",this.state.resultQA)
        })
            .catch(err => console.log('Profile', err))



            this.Auth.fetch('http://localhost:5000/api/notification', {
            method: 'POST', body: JSON.stringify({
                    mod:'shared'
            })
        }).then(res => {
            var tp=[]
            if(this.state.resultQA !==[]){
                var ttp=this.state.resultQA
                tp=[...ttp]
            }
            
            tp=[...tp,...res]
            this.setState({resultQA:tp})
        })
            .catch(err => console.log('Profile', err))

            

            
            this.Auth.fetch('http://localhost:5000/api/follow', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            var tp=[...this.state.resultQA]
            tp=[...tp,...res]
            this.setState({resultQA:tp})
        })
            .catch(err => console.log('Profile', err))

            
                
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


    acceptReq = (rqid) =>{
        this.Auth.fetch('http://localhost:5000/api/acceptreq', {
            method: 'POST', body: JSON.stringify({
                rid:rqid,
                status:1
            })
        }).then(res => {
            this.setState()
            console.log("success")
        })
            .catch(err => console.log('Profile', err))

    }

    rejectReq = (rqid) =>{
    
        this.Auth.fetch('http://localhost:5000/api/acceptreq', {
            method: 'POST', body: JSON.stringify({
                rid:rqid,
                status:0
            })
        }).then(res => {
            this.setState()
            console.log("successfully rejected")
        })
            .catch(err => console.log('Profile', err))

    }


    render() {
        let ana=''
        console.log("QA",this.state.resultQA)
        if(this.state.resultQA.length>0){
            ana=this.state.resultQA.map(anan1=>{
              return(  <div className="actualcontent">
                <span>{anan1.msg}</span>
            </div>)

            })
        }
        let re=''
        if(this.state.resultshare.length>0){
         re=this.state.resultshare.map(r1=>{
            return(<div className="actualcontent">
            <span>The request from {r1.sentby} for  {r1.name} </span><br />
            <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }} onClick={()=>{this.acceptReq(r1._id)}}>Accept</Button>
            <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }} onClick={()=>{this.rejectReq(r1._id)}}>Reject</Button>
        </div>)

        })
        }
        let user = ''
        if (this.state.username === '') {
            user = <a href="javascript:void(0);"><NavLink to="/Login" className="LRNL">Login or Register</NavLink></a>

        }
        else {
            user = <a href="javascript:void(0);" className="LRNL">Welcome {this.state.username}</a>

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
                                                    {/* <div className="actualcontent">
                                                        <span>The request from moksh for vcet community</span><br />
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }}>Accept</Button>
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }}>Reject</Button>

                                                    </div>

                                                    <div className="actualcontent">
                                                        <span>The request from moksh for vcet community</span><br />
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }}>Accept</Button>
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }}>Reject</Button>

                                                    </div>

                                                    <div className="actualcontent">
                                                        <span>The request from moksh for vcet community</span><br />
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }}>Accept</Button>
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }}>Reject</Button>

                                                    </div>

                                                    <div className="actualcontent">
                                                        <span>The request from moksh for vcet community</span><br />
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }}>Accept</Button>
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }}>Reject</Button>

                                                    </div>

                                                    <div className="actualcontent">
                                                        <span>The request from moksh for vcet community</span><br />
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }}>Accept</Button>
                                                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }}>Reject</Button>

                                                    </div> */}

                                                </div> : null
                                        }


                                        {
                                            this.state.qanda === true ?
                                                <div className="con">
                                                {ana}
                                                    {/* <div className="actualcontent">
                                                        <span>nilesh has answered your question</span>
                                                    </div> */}
                                                </div> : null
                                        
                                        }


                                        {
                                            this.state.history === true ?
                                                <div className="con">
                                                    <div className="actualcontent">

                                                    </div>

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