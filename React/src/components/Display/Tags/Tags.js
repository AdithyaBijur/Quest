import React, { Component } from 'react';
import './Tags.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AuthService from '../../../AuthService/AuthService'
import { NavLink } from 'react-router-dom'
class Tags extends Component {


  constructor(props) {
    super(props)
    this.Auth = new AuthService()
  }
  state = {
    Name: '',
    results: []
  }
  componentDidMount() {
    this.getResults()
  }
  getResults = () => {
    this.Auth.fetch('http://localhost:5000/api/viewtag', {
      method: 'POST', body: JSON.stringify({

        tag: this.state.Name
      })
    }).then(res => {
      this.setState({ results: res })
      console.log(this.state)
    })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    let x = e.target.name
    this.setState(
      {
        [x]: e.target.value
      }
    )
    this.getResults()
  }


  render() {
    if (this.state.results.length > 0) {
      var tags = this.state.results.map(t => {
        return (<div className="tagdivs">
          <a href="javascript:void(0);"><NavLink to={"/Quetag/" + (t.name)}>{t.name}</NavLink></a>
          <p>{t.description}</p>
        </div>)
      })
    }
    else
      tags = ''



    return (
      <div>
        <div className="topbar">
          <h3>Tags</h3>
          <input type="search" placeholder="Find Tags" name="Name" onChange={this.handleChange} /><br />
        </div><hr />
        <div>
          {tags}
        </div>
      </div>
    );
  }
}


export default Tags