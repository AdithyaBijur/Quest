import React, { Component } from 'react';
import '../../First.css';
import Header from '../../components/Header/Header';
import Selector from '../../components/Selector/Selector';
import Users from '../../components/Display/User/User';

class UserRoute extends Component {
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
          <Users />
        </div>
      </div>
    );
  }
}

export default UserRoute;
