import React , {Component} from 'react';
import './header.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends Component {
  
  constructor(props) {
    super(props);  
  }

 

  render() {
    return (
      <div className='header shadow'>
        <Navbar expand="md">
          <NavbarBrand className="header-brand" href="/">Ryuk.io</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}


export default Header;