import React from 'react';
import { Table } from 'semantic-ui-react'
import { toPairs } from 'ramda';

const renderRow = (row, index) => {
  return {
    cells:[
      {content: row[0] },
      {content: row[1] }
    ]
  }
};

export default class Detail extends React.Component {
  render() {
    return (
      <Table tableData={toPairs(this.props.data)} renderBodyRow={renderRow}>
      </Table>
    );
  };

};
