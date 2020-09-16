import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App'
import './App.css'
import './styles/main.css'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App className='bg-gray-200' />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
