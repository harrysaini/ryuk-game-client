import React, {Component} from 'react';
import './sidebar.css';
import {NavLink} from 'react-router-dom';
import {Nav, NavItem, NavLink as ALink } from 'reactstrap';

class SideBar extends Component {

  

 
  render() {

    
    return (
      <div className="sidebar sidebar-fixed">
        <nav className="sidebar-nav ">
          <Nav>
            <NavItem className='nav-single-wrap'>
              <NavLink to='/' className='nav-single-link'>
                <i className="icon-speedometer"></i> Dashboard
              </NavLink>
            </NavItem>
            <NavItem className='nav-dropdown-link nav-single-wrap'>
                <ALink className='nav-single-link'>
                  <i className="icon-user"></i> Users
                </ALink>
                <ul className='nav-dropdown-list'>
                  <NavItem className='nav-single-wrap'>
                    <NavLink to='users/add' className='nav-single-link'>
                      <i className="icon-plus"></i> Add User
                    </NavLink>
                  </NavItem>
                  <NavItem className='nav-single-wrap'>
                    <NavLink to='/users'className='nav-single-link'>
                      <i className="icon-list"></i> Users List
                    </NavLink>
                  </NavItem>
                </ul>
            </NavItem>
          </Nav>
        </nav>
      </div>
    )
  }
}

export default SideBar;
