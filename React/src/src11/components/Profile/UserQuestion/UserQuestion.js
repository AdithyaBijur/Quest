import React, { Component } from 'react';
import './UserQuestion.css';
import Chip from '@material-ui/core/Chip';
import VA from '../VerifyAnswer/VerifyAnswer';
import { Button } from 'react-bootstrap';
import AuthService from '../../../AuthService/AuthService';
import { faPoundSign } from '@fortawesome/free-solid-svg-icons';
class UserQuestion extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            qid: '',
            ViewOwnQ: [],
            showallq: true,
            showva: false,
        };

    }

    
    componentWillMount() {

        this.Auth.fetch('http://localhost:5000/api/viewownquestion', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            console.log("this is view own Question", res)
            this.setState({ ViewOwnQ: res })
        })
            .catch(err => console.log('view own Question error', err))

    }


    // displayverifyansHandler = () => {
    //     this.setState({ showallq: false })
    //     this.setState({ showva: true })
    // }



    showques = (id) => {
        console.log(id)
        this.setState({ qid: id })
        this.setState({ showallq: false })
        this.setState({ showva: true })
        console.log(this.state)
        // console.log('showall')
    }


    deleteque = (queid) => {
        console.log("this is commu id",queid)
        this.Auth.fetch('http://localhost:5000/api/deletequestion', {
            method: 'POST', body: JSON.stringify({
                qid: queid
            })
        }).then(res => console.log("Successfully deleted", res))
            .catch(err => console.log('Delete answer error', err))
    }



    render() {
        // console.log('This is view Own Quest ', this.state.ViewOwnQ);
        let poq = this.state.ViewOwnQ.map(puoq => {
            return (
                <div>
                    <div className="UQdiv">
                        <div className="UQVUV">
                            <div className="MAINVUV">
                                <div className="votesdiv">
                                    <div className="Numberdisplay">
                                        <a href="">{puoq.upvotes}</a>
                                    </div>
                                    <div className="Vtext">
                                        <a href="">Votes</a>
                                    </div>
                                </div>
                                <div className="votesdiv">
                                    <div className="Numberdisplay">
                                        <a href="">{puoq.noa}</a>
                                    </div>
                                    <div className="Vtext">
                                        <a href="">Answer</a>
                                    </div>
                                </div>
                                <div className="votesdiv">
                                    <div className="Numberdisplay">
                                        <a href="">{puoq.views}</a>
                                    </div>
                                    <div className="Vtext">
                                        <a href="">Views</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="QTdisplay">
                            <div className="UQQDispkay">
                                <a href="javascript:void(0);" onClick={() => this.showques(puoq._id)}>{puoq.title}</a>
                            </div>
                            <div className="UQTag">
                                <Chip
                                    label="JAVA"
                                    component="a"
                                    href=""
                                    clickable
                                    className="TAGS"
                                    variant="outlined"
                                />
                                <Chip
                                    label="Android"
                                    component="a"
                                    href=""
                                    clickable
                                    className="TAGS"
                                    variant="outlined"
                                />
                            </div>
                            <div className="UQDDiv">
                                {/* <Button className="UQDbutton"> Delete Question</Button> */}
                                <Button variant="outline-primary" className="UQDbutton"  onClick={() => this.deleteque(puoq._id)}>Delete Question</Button>
                            </div>

                        </div>
                    </div>
                    <hr />
                </div>
            )
        })




        return (
            <div>
                <div>
                    {
                        this.state.showallq === true ?
                            <div className="UQMAIN">
                                {poq}

                            </div> : null

                    }
                </div>


                <div>
                    {
                        this.state.showva === true ?
                            <div>
                                <VA qid={this.state.qid} />
                            </div> : null
                    }
                </div>

            </div>
        );
    }
}


export default UserQuestion