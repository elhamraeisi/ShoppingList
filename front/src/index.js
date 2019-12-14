import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import ConnexionPage from './pages/ConnexionPage';
import ProduitsPage from './pages/ProtuitsPage';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    constructor() {
      super();
      this.state = {
        name: 'React'
      };
    }
  
    render() {
      return (
        <Router>
          <div>
            <Route exact path="/" component={ConnexionPage} />
            <Route path="/produits" component={ProduitsPage} />
          </div>
        </Router>
      );
    }
  }

  render(<App />, document.getElementById('root'));

serviceWorker.unregister();
