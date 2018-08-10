import React, {Component} from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Full from './components/Full/Full.js';


class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Switch>
        <Route path="/" name="Home" component={Full}/>
      </Switch>
    </BrowserRouter>
    );
}
}

export default App;
