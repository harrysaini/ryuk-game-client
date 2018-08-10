import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer ,toast} from 'react-toastify';


import './full.css';
import Header from '../Header/Header.js';
import SideBar from '../SideBar/SideBar.js';
import Footer from '../Footer/Footer.js';
import Dashboard from '../Dashboard/Dashboard';
import AddUserPage from '../AddUserPage/AddUserPage';


class Full extends Component {
  render() {
    return (
      <div className="app">
        <ToastContainer
          position = {toast.POSITION.BOTTOM_CENTER}
        />
        <Header />
        <div className="app-body">
          <SideBar />
          <div className="main-div">
            <Container fluid className='main-div-inner'>
              <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/users/add' component={AddUserPage} />
                <Redirect from='/' to='/dashboard' />
              </Switch>
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
