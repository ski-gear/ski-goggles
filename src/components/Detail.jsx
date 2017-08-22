// @flow

import React from 'react';
import { Table } from 'semantic-ui-react'
import type { InterceptedDatum } from '../types.js';

type Props = {
  data: Array<InterceptedDatum>
};

const renderRow = (row: InterceptedDatum, index: number) => {
  return {
    cells:[
      {content: row.label },
      {content: format(row.valueType, row.value) }
    ]
  }
};

const format = (valueType: string, value: string): React$Element<any> => {
  if(valueType == "json"){
    return(
      <div className="code">
        <pre className="code">{value}</pre>
      </div>
      )
  } else {
    return <div>{value}</div>
  }
}

export default class Detail extends React.Component<Props> {
  render() {
    return (
      <Table celled tableData={this.props.data} renderBodyRow={renderRow}>
      </Table>
    );
  };
};
