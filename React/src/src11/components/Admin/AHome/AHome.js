import React, { Component } from 'react';
import './AHome.css';
import Header from '../AHeader/AHeader';
import Question from '../AllQuestion/AllQuestion';

class AHome extends Component {
    render() {
        return (
            <div >
                <div className="AFirst">
                    <Header />
                </div>
                <div className="ASecond">
                    <div className="ASDescri">
                        <h3>1,000 Total Questions</h3>
                    </div>
                    <hr />
                    <div className="AContentDisplay">
                        <Question/>
                    </div>
                </div>

            </div>
        );
    }
}


export default AHome