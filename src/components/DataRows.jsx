// @flow

import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import { path } from 'ramda';
import Title from './Title.jsx';
import Detail from './Detail.jsx';
import type { InterceptedDataEnvelope } from '../types.js';

type Props = {
};

type State = {
  rows: Array<{title: Title, content: Detail, timeStamp: string}>
};

export default class DataRows extends React.Component<Props, State> {
  componentDidMount(){
    // $FlowFixMe
    document.addEventListener('newData', (data: InterceptedDataEnvelope) => {
    // $FlowFixMe
      this.appendRow(data.detail);
    });
  };

  constructor(props: Props) {
    super(props);
    this.state = { rows: [] };
    // $FlowFixMe
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

  appendRow(data: InterceptedDataEnvelope) {
    if(path(['type'], data) !== "webRequest"){
      return;
    };

    let payload = data.payload;
    let requestData = data.payload.data;
    let url = payload.url;
    let title = <Title name={payload.providerDisplayName}  logo={payload.providerLogo}/>;
    let content = <Detail data={requestData} />;
    let row = { title: title, content: content, key: payload.timeStamp }

    let nextState = this.state;
    // $FlowFixMe
    nextState.rows.push(row);

    this.setState(nextState);
  }
};
