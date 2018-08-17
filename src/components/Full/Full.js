import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer ,toast} from 'react-toastify';


import './full.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Home from '../Home/Home';
import TicTacToe from '../../games/tic-tac-toe/index.js';
import utils from '../../utils/utils.js';

const generateGameID = utils.generateGameID;

class Full extends Component {
  render() {
    return (
      <div className="app">
        <ToastContainer
          position = {toast.POSITION.BOTTOM_CENTER}
        />
        <Header />
        <div className="app-body">
          <div className="main-div">
            <Container fluid className='main-div-inner'>
              <Switch>
                <Route path='/home' component={Home} />
                <Route path='/tic-tac-toe/:gameID' component={TicTacToe}/>


                <Redirect from='/tic-tac-toe' to={'/tic-tac-toe/'+generateGameID('tic')}/>
                <Redirect from='/' to='/home' />

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
