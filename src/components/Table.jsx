import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import { path } from 'ramda';
import Title from './Title.jsx';

export default class Table extends React.Component {
  componentDidMount(){
    document.addEventListener('newData', (data) => {
      console.log('new data', data);
      this.appendRow(data);
    });
  };

  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.appendRow = this.appendRow.bind(this);
  };

  render() {
    return (
      <div>
        <Accordion panels={ this.state.rows } styled fluid>
        </Accordion>
      </div>
    );
  }

  appendRow(data) {
    if(path(['detail', 'type'], data) !== "webRequest"){
      return;
    };

    let payload = data.detail.payload;
    let url = payload.url;
    let title = <Title timeStamp={payload.timeStamp} />;
    let row = { title: title, content: url, key: payload.timeStamp }

    let nextState = this.state;
    nextState.rows.push(row);

    this.setState(nextState);
  }
};
