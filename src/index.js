import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { hydrate, render } from 'react-dom';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  console.log('hydrate');
  hydrate(<App />, rootElement);
} else {
  console.log('render');
  render(<App />, rootElement);
}
registerServiceWorker();
