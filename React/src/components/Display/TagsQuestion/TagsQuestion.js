import React, { Component } from 'react';
import './TagsQuestion.css';

import '../../../First.css'
import Header from '../../Header/Header'
import Selector from '../../Selector/Selector'
import AuthService from '../../../AuthService/AuthService'
import { NavLink } from 'react-router-dom';
import Answer from '../../Answer/Answer'
import { Button } from 'react-bootstrap'
import Share from '../../Popup/Share'
class TagsQuestion extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            latest: [],
            showall: true,
            qid: '',
            show: false

        }
    }


    componentDidMount() {
        // const q = this.props.nameoftag
        const q = this.props.match.params
        this.setState({ qid: q.tagname })
        console.log('_________________________________saas_______________________', q.tagname)

        this.Auth.fetch('http://localhost:5000/api/viewquestionbytag', {
            method: 'POST', body: JSON.stringify({
                tag: q.tagname
            })
        }).then(res => {
            console.log("TThis is question with its tags", res)
            this.setState({ latest: res })
            // console.log('tpp')
        })
            .catch(err => console.log('latest', err))


        setTimeout(function () { //Start the timer
            this.setState({ show: true }) //After 1 second, set render to true
        }.bind(this), 1000)


    }
    showques = (id) => {
        this.setState({ qid: id, showall: !this.state.showall })
        console.log(this.state)
        // console.log('showall')

    }

    render() {
        // this.state.latest.length > 0
        let lv = ''
        console.log('from here', this.state)
        if (this.state.showall === true) {
            if (this.state.latest.length > 0) {


                lv = this.state.latest.map(lat => {
                    let tags = lat.tags.map(l => { return (<a href="">{l}</a>) })
                    return (<div className="qa">
                        <div className="qadiv">
                            <div className="q" onClick={() => this.showques(lat._id)}>{lat.title}</div>
                            <div className="t">{tags}</div>
                            <div className="a"><p>Asked by:</p><a href="">{lat.creatorname}</a></div>
                        </div>
                        <div className="vav">
                            <div className="fp">
                                <div className="fc">
                                    <p>{lat.upvotes}</p>
                                </div>
                                <div className="ft">
                                    <p>Votes</p>
                                </div>
                            </div>
                            <div className="sp">
                                <div className="fc">
                                    <p>{lat.noa}</p>
                                </div>
                                <div className="ft">
                                    <p>Answers</p>
                                </div>
                            </div>
                            <div className="tp">
                                <div className="fc">
                                    <p>{lat.views}</p>
                                </div>
                                <div className="ft">
                                    <p>Views</p>
                                </div>
                                <div>
                                    <Share qid={lat._id} que={lat.title} />
                                </div>

                            </div>

                        </div>
                    </div>

                    )
                })
            }
            else {
                if (this.state.show) {
                    lv = (<div style={{ marginLeft: 80, fontSize: 20, marginTop: 50 }}>No Questions Of This Category</div>)
                }
            }


            return (
                <div >
                    <div className="First">
                        <Header />
                    </div>
                    <div className="Second">
                        <Selector />
                    </div>
                    <div className="Third">
                        <div className="Tag_topbar">
                            <h3>{this.state.latest.length} {this.state.qid.toUpperCase()} QUESTIONS</h3>
                            {/* <hr /> */}
                        </div>
                        <hr />
                        <div className="qa_divs"  >
                            {lv}
                        </div>
                    </div>
                </div>

            );

        }
        else {

            return (
                <div >
                    <div className="First">
                        <Header />
                    </div>
                    <div className="Second">
                        <Selector />
                    </div>
                    <div className="Third">
                        <div className="qa_divs"  >
                            <Answer qid={this.state.qid} ></Answer>
                        </div>
                    </div>
                </div>)

        }
    }
}


export default TagsQuestion