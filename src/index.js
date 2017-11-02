import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/routeMap';
import { Provider } from 'react-redux'
import store from './redux/stores/createStore'
// import './static/styles/index.less'

// import App from './containers/main';
// Render the main component into the dom
ReactDOM.render(<Provider store={store()}>
  <App />
</Provider>, document.getElementById('app'));
