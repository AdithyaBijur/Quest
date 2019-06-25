import React, { Component } from 'react';
import './Latest.css';
import AuthService from '../../../../AuthService/AuthService'
import { NavLink } from 'react-router-dom';
import Answer from '../../../Answer/Answer'
import { Button } from 'react-bootstrap'
import Share from '../../../Popup/Share'
class Latest extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            latest: [],
            showall: true,
            qid: ''
        }
    }


    componentDidMount() {
        console.log('inside')
        if (this.state.showall === true) {
            this.Auth.fetch('http://localhost:5000/api/viewquestion', {
                method: 'POST', body: JSON.stringify({
                    mod: 'latest'
                })
            }).then(res => {
                this.setState({ latest: res })
                console.log('tpp')
            })
                .catch(err => console.log('latest', err))
        }

    }
    showques = (id) => {
        this.setState({ qid: id, showall: !this.state.showall })
        console.log(this.state)
        // console.log('showall')



    }

    render() {
        let lv = ''
        console.log(this.state)
        if (this.state.showall === true) {
            if (this.state.latest.length > 0) {
                let lv = this.state.latest.map(lat => {
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

            return (
                <div className="qa_divs"  >
                    {lv}
                </div>

            );
            //        return (<Answer qid={this.state.qid} ></Answer>)
        }
        else {

            return (<Answer qid={this.state.qid} ></Answer>)

        }
    }
}


export default Latest