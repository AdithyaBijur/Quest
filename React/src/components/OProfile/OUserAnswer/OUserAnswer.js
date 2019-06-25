import React, { Component } from 'react';
import './OUserAnswer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
library.add(faThumbsUp, faThumbsDown);
class OUserAnswer extends Component {
    render() {
        return (
            <div className="UAMAINDIV">
                <div className="MAINTOPDIV">
                    <div className="QT">
                        <div className="questinfo">
                            <div className="qasecdiv">
                                <div className="qu"><a href="">Q. Calculation of time execution as
                             separate class, where function is variable?</a></div>
                                <div className="ta"><a href="">Programming</a><a href="">web</a><a href="">Anything</a></div>
                                <div className="as"><p>Ask by:</p><a href="">This is user</a></div>
                            </div>
                        </div>
                        <div className="Useraction">
                            <div className="upvotediv">
                                <div className="like">
                                    <a><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" /></a>
                                    <p>80</p>
                                </div>
                            </div>
                            <div className="Psubmitdiv">
                                <a className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" /></a>
                                <p>09</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <p className="anslabel">ANSWER</p>
                    <div className="Ansdiv">
                        <div className="ansp">
                            <p>

                                I do not think the problem is arising for adding
                                the common addOnScrollListener to your RecyclerView.
                                I think this problem is occurring due to the implementation of control
                                flow and for the race condition among threads while fetching
                                the lists using API calls. Let me describe my idea briefly.
                        </p>
                            <div className="ans">

                                <p>Answered by:</p><a href="" className="ansu">This is user</a>
                            </div><br />

                        </div>
                    </div>

                </div>

                <div className="MAINTOPDIV">
                    <div className="QT">
                        <div className="questinfo">
                            <div className="qasecdiv">
                                <div className="qu"><a href="">Q. Calculation of time execution as
                             separate class, where function is variable?</a></div>
                                <div className="ta"><a href="">Programming</a><a href="">web</a><a href="">Anything</a></div>
                                <div className="as"><p>Ask by:</p><a href="">This is user</a></div>
                            </div>
                        </div>
                        <div className="Useraction">
                            <div className="upvotediv">
                                <div className="like">
                                    <a><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" /></a>
                                    <p>80</p>
                                </div>
                            </div>
                            <div className="Psubmitdiv">
                                <a className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" /></a>
                                <p>09</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <p className="anslabel">ANSWER</p>
                    <div className="Ansdiv">
                        <div className="ansp">
                            <p>

                                I do not think the problem is arising for adding
                                the common addOnScrollListener to your RecyclerView.
                                I think this problem is occurring due to the implementation of control
                                flow and for the race condition among threads while fetching
                                the lists using API calls. Let me describe my idea briefly.
                        </p>
                            <div className="ans">

                                <p>Answered by:</p><a href="" className="ansu">This is user</a>
                            </div><br />

                        </div>
                    </div>

                </div>




                <div className="MAINTOPDIV">
                    <div className="QT">
                        <div className="questinfo">
                            <div className="qasecdiv">
                                <div className="qu"><a href="">Q. Calculation of time execution as
                             separate class, where function is variable?</a></div>
                                <div className="ta"><a href="">Programming</a><a href="">web</a><a href="">Anything</a></div>
                                <div className="as"><p>Ask by:</p><a href="">This is user</a></div>
                            </div>
                        </div>
                        <div className="Useraction">
                            <div className="upvotediv">
                                <div className="like">
                                    <a><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" /></a>
                                    <p>80</p>
                                </div>
                            </div>
                            <div className="Psubmitdiv">
                                <a className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" /></a>
                                <p>09</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <p className="anslabel">ANSWER</p>
                    <div className="Ansdiv">
                        <div className="ansp">
                            <p>

                                I do not think the problem is arising for adding
                                the common addOnScrollListener to your RecyclerView.
                                I think this problem is occurring due to the implementation of control
                                flow and for the race condition among threads while fetching
                                the lists using API calls. Let me describe my idea briefly.
                        </p>
                            <div className="ans">

                                <p>Answered by:</p><a href="" className="ansu">This is user</a>
                            </div><br />

                        </div>
                    </div>

                </div>



            </div>
        );
    }
}


export default OUserAnswer