// @flow

import React from 'react';
import { Table } from 'semantic-ui-react';
import Highlight from 'react-highlight';

import type { WebRequestParam, WebRequestData } from '../types.js';

type Props = {
  data: WebRequestData
};

const renderRow = (row: WebRequestParam, _index: number) => {
    return {
        cells:[
            {content: row.label },
            {content: format(row.valueType, row.value) }
        ]
    };
};

const format = (valueType: string, value: string) => {
    if(valueType == 'json'){
        return(
            <Highlight className='json'>
                {value}
            </Highlight>
        );
    } else {
        return <div>{value}</div>;
    }
};

export default class Detail extends React.Component<Props> {
    render() {
        return (
            <Table celled tableData={this.props.data.params} renderBodyRow={renderRow}>
            </Table>
        );
    }
}
