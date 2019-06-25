import React, { Component } from 'react';
import './App.css';
import First from './First.js';
import Profile from '../src/components/Profile/Profile';
import Login from './components/LoginSignup/Login/Login';
import Signup from './components/LoginSignup/Signup/Signup';
import Question from '../src/RoutingMain/QuestionRoute/QuestionRoute';
import User from '../src/RoutingMain/UserRoute/UserRoute';
import Tag from '../src/RoutingMain/TagsRoute/TagsRoute';
import Ques from '../src/RoutingMain/QuestionDetail/QuestionDetail';
import { BrowserRouter, Route } from 'react-router-dom';
import { Search } from 'semantic-ui-react';
import Searcher from '../src/components/Search/Search'
import withAuth from '../src/withAuth'


class App extends Component {
  render() {
    return (


      <BrowserRouter>
        <div>
        <First> </First>
        </div>
      </BrowserRouter>


    );
  }
}

export default withAuth(App);

