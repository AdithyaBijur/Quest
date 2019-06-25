import React, { Component } from 'react';
import './First.css';
import Selector from './components/Selector/Selector';
import Question from './components/Display/Question/Question';
import User from './components/Display/User/User';
import Tags from './components/Display/Tags/Tags';
import Latest from './components/Display/Question/Latest/Latest';
import Most_View from './components/Display/Question/Most_View/Most_View';
import Unanswer from './components/Display/Question/Unanswer/Unanswer';
import Answer from './components/Answer/Answer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import withAuth from './withAuth'

import Header from './components/Header/Header';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faThumbsUp, faThumbsDown, faCheckCircle);

// import { Button } from 'react-bootstrap';

class First extends Component {
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
          {/* <Tags /> */}
          <Question />
          {/* <User /> */}
          {/* <Answer /> */}
        </div>
      </div>
    );
  }
}

export default withAuth(First);
