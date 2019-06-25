import React, { Component } from 'react';
import './AProfile.css';
import Header from '../AHeader/AHeader';
import withAuth from '../../../../src/withAuthAdmin'
import {Button} from 'react-bootstrap'
class AProfile extends Component {
    render() {
        return (

            <div >
                <div className="APFirst">
                    <Header />
                </div>
                <div className="APSecond">
                    <div className="APMAINDIV">
                        <div className="AdminP">
                            <h3>Hello Admin</h3>
                            <h3>Your Last Login: 02:12:43 PM</h3>
                            <h3>On 12/03/19</h3>
                            <Button variant="outline-primary" style={{marginLeft:370,marginTop:50}}>Logout</Button>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default withAuth(AProfile)