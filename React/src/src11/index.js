import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import First from './First.js';
import Profile from '../src/components/Profile/Profile';
import Login from './components/LoginSignup/Login/Login';
import Signup from './components/LoginSignup/Signup/Signup';
import Question from '../src/RoutingMain/QuestionRoute/QuestionRoute';
import User from '../src/RoutingMain/UserRoute/UserRoute';
import Tag from '../src/RoutingMain/TagsRoute/TagsRoute';
import Commu from './RoutingMain/CommuRoute/CommuRoute';
import Co from './components/Community/Community';
import CC from './components/CreateCommunity/CreateCommunity';
import Ques from '../src/RoutingMain/QuestionDetail/QuestionDetail';
import Admin from './components/Admin/AHome/AHome';
import AQD from './components/Admin/AQuestionDetails/AQuestionDetails';
import AProfile from './components/Admin/AProfile/AProfile';
import OProfile from './components/OProfile/OProfile';
import SQ from './components/SearchQuestion/SearchQuestion';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={First} exact />
            <Route path="/Admin" component={Admin} exact />
            <Route path="/AQD" component={AQD} exact />
            <Route path="/AProfile" component={AProfile} exact />
            <Route path="/Profile" component={Profile} exact />
            <Route path="/Pro/:Uname" component={OProfile} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/Signup" component={Signup} exact />
            <Route path="/Question" component={Question} exact />
            <Route path="/Users" component={User} exact />
            <Route path="/Tags" component={Tag} exact />
            <Route path="/Communities" component={Commu} exact />
            <Route path="/QuestionClicked/:qid" component={Ques} exact />
            <Route path="/Community/:id" component={Co} exact />
            <Route path="/CreateCommunity" component={CC} exact />
            <Route path="/Ques/:Qid" component={SQ} exact />
        </div>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
