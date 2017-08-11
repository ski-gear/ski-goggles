import React from 'react';
import Row from './Row.jsx';

export default class App extends React.Component {
  componentDidUpdate(...args) {
    console.log(1);
    $('.ui.accordion').accordion();
  }

  render() {
    return (
      <div>
        <Row />
      </div>);
  }
};
