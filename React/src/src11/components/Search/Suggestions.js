import React, { Component } from 'react'
import './Suggestions.css'
import { NavLink } from 'react-router-dom'
import AuthService from '../../AuthService/AuthService'


class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      latest: [],
      most: [],
      showall: true,
      q: '',
      qid: '',
      sample: []
    }
  }

  componentDidMount() {
    console.log('inside')
    // console.log('this is inside Suggestion',this.props.any)

  }

  showques = (id) => {

  }


  render() {
    let options = ''
    if (this.props.results.length > 0) {
      options = this.props.results.map(r => {
        //  console.log('anaconda' ,this.props.allinfo)
        const op = this.props.allinfo.map(rout => {
          if (rout.title === r) {
            console.log("ana", rout._id)
            return (rout._id)
          }
        })

        var lucky = op.filter(function (number) {
          return number != undefined;
        })


        const a = op
        console.log("This is mumbai", lucky)
        return (<div className='burger'>
          <NavLink to={"/Ques/" + (lucky)}> <span key={this.props.results.indexOf(r)} onClick={() => this.showques(r)}>
            {r}
          </span>
          </NavLink>
        </div>
        )
      }
      )
    }
    return (

      <ul>{options}</ul>
    )
    // return(<div></div>)
  }
}

export default Suggestions