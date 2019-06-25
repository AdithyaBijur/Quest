import React, { Component } from 'react';
import './Question.css';
import Latest from './Latest/Latest';
import Most_View from './Most_View/Most_View';
import Unanswer from './Unanswer/Unanswer';
class Question extends Component {

    state = {
        latest: true,
        most_view: false,
        unanswer: false
    };

    setlatestHandler = () => {

        this.setState({ latest: true });

        this.setState({ most_view: false });

        this.setState({ unanswer: false });
    }

    setmost_viewHandler = () => {

        this.setState({ latest: false });

        this.setState({ most_view: true });

        this.setState({ unanswer: false });
    }

    setunanswerHandler = () => {

        this.setState({ latest: false });

        this.setState({ most_view: false });

        this.setState({ unanswer: true });
    }

    render() {
        let display = null;
        if (this.state.latest) {
            display = (
                <Latest />
            );
        }

        if (this.state.most_view) {
            display = (
                <Most_View />
            );
        }
        if (this.state.unanswer) {
            display = (
                <Unanswer />
            );
        }

        return (
            <div>
                <div className="Q_topbar">
                    <h3>All Questions</h3>
                    {/* <hr /> */}
                </div>
                <div className="Q_lists">
                    <li><a href="javascript:void(0);" onClick={this.setlatestHandler}>Latest</a></li>
                    <li><a href="javascript:void(0);" onClick={this.setmost_viewHandler}>Most Viewed</a></li>
                    <li><a href="javascript:void(0);" onClick={this.setunanswerHandler}>Unanswered</a></li>
                </div>
                {/* <Latest /> */}
                {/* <Most_View /> */}
                {/* <Unanswer /> */}
                {display}
            </div>
        );
    }
}


export default Question