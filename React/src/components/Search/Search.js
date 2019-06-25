import React, { Component } from 'react'
// import axios from 'axios'
import Suggestions from './Suggestions'
import AuthService from '../../AuthService/AuthService'
import $ from 'jquery';
import './Search.css'
// const { API_KEY } = process.env
// const API_URL = 'http://api.musicgraph.com/api/v2/artist/suggest'
let a;
class Search extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
  }
  state = {
    query: '',
    results: [],
    qid: [],
    all: []
  }

  componentDidMount = () => {
    $(".In").hover(function () {
      $(".displayresult").css("width", "400px");
    })

    $("input").mouseout(function () {
      $(".displayresult").css("width", "350px");
    })
  }

  // getInfo = () => {
  //   axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
  //     .then(({ data }) => {
  //       this.setState({
  //         results: data.data
  //       })
  //     })
  // }


  getResults = () => {
    this.Auth.fetch('http://localhost:5000/api/searchquest', {
      method: 'POST', body: JSON.stringify({
        word: this.state.query
      })
    }).then(res => {
      a = res
      this.setState({ all: res })
      console.log('This is hole', a)
      let re1 = res
      re1 = re1.map(r1 => r1._id)
      this.setState({ qid: re1 })
      console.log('This is only id', this.state.qid)
      res = res.map(r => r.title)
      this.setState({ results: res })
      console.log("this is only quest", this.state.results)
      console.log(this.state)
    })
      .catch(err => console.log('downques', err))
  }


  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
    this.getResults()
  }

  render() {
    var suggestions = ''
    if (this.state.query !== '')
      suggestions = <Suggestions allinfo={this.state.all} results={this.state.results} uqid={this.state.qid} />
    return (
      <form>
        <div className="MainSearch">
          <div className='search_style'>
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              className="In"
            />
          </div>
          <div className="displayresult">
            <div className="contentdisplay">
              {suggestions}
            </div>

          </div>
          {/* <Suggestions results={this.state.results}  /> */}
        </div>
      </form>
    )
  }
}

export default Search
