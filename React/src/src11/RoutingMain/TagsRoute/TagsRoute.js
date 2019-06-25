import React, { Component } from 'react';
import '../../First.css';
import Header from '../../components/Header/Header';
import Selector from '../../components/Selector/Selector';
import Tags from '../../components/Display/Tags/Tags';

class QuestionRoute extends Component {
  render() {
    return (
      <div >
        <div className="First">
          <Header />
        </div>
        <div className="Second">
          <Selector />
        </div>
        <div className="Third">
          <Tags />
        </div>
      </div>
    );
  }
}

export default QuestionRoute;
