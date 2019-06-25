import React, { Component } from 'react';
import './AHeader.css';
// import SigupSignin from '../Popup/SignupSignin';
import Searcher from '../../Search/Search';

import { NavLink } from 'react-router-dom';
class AHeader extends Component {
    render() {
        return (
            <header className="toolbar">
                <nav className="nevigation_menu">
                    <div className="logo_style">
                        <a href=""><NavLink to="/Admin">Quest</NavLink></a>
                    </div>

                    <Searcher></Searcher>

                    <div className="lists">
                        <div className="Afst">
                            <li><NavLink to="/Admin"><a href="">Home</a></NavLink></li>
                        </div>

                        <div className="Atrd">
                            <li><NavLink to="/AProfile"><a href="">Profile</a></NavLink></li>
                        </div>
                    </div>
                    <div className="login_reg">
                        <a href="#"><NavLink to="/Login" className="LRNL" style={{ color: 'white', fontWeight: 650 }}>Welcome Admin</NavLink></a>
                        {/* <a href="#" variant="outlined" color="primary" onClick={this.handleClickOpen}>Login or Register  </a>  */}
                        {/* <SigupSignin /> */}
                    </div>
                </nav>
            </header>
        );
    }
}

export default AHeader