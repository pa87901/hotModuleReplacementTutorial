import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


const renderApp = Component => {
  ReactDOM.render(<Component />, document.getElementById('app'));
};
renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    console.log('Accepting the updated App component');
    const App2 = require('./components/App').default;
    renderApp(App2);
  });
}