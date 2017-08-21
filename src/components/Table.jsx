import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import { path } from 'ramda';
import Title from './Title.jsx';
import Detail from './Detail.jsx';

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
    let requestData = data.detail.payload.data;
    let url = payload.url;
    let title = <Title timeStamp={payload.timeStamp} />;
    let content = <Detail data={requestData} />;
    let row = { title: title, content: content, key: payload.timeStamp }

    let nextState = this.state;
    nextState.rows.push(row);

    this.setState(nextState);
  }
};
