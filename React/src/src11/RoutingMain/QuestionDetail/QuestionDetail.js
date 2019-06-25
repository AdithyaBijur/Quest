import React, { Component } from 'react';
import '../../First.css';
import Header from '../../components/Header/Header';
import Selector from '../../components/Selector/Selector';
import Answer from '../../components/Answer/Answer';

class QuestionDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { qid: '' }
  }

  componentDidMount() {
    const q = this.props.match.params
    this.setState({ qid: q })

  }
  render() {

    console.log(this.state.qid)
    return (

      < div >
        <div className="First">
          <Header />
        </div>
        <div className="Second">
          <Selector />
        </div>
        <div className="Third">
          <Answer />
        </div>
      </div >
    );
  }
}

export default QuestionDetails;
