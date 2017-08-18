import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

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
        <Accordion panels={ this.state.rows }>
        </Accordion>
      </div>
    );
  }

  appendRow(data) {
    if(data.detail.type != "webRequest"){
      return;
    };

    let payload = data.detail.payload;
    let url = payload.url;
    let title = `${url}-${moment().unix()}`;
    let row = { title: title, content: url }

    let nextState = this.state;
    nextState.rows.push(row);

    this.setState(nextState);
  }
};
