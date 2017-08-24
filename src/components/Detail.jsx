// @flow

import React from 'react';
import { Table } from 'semantic-ui-react';
import Highlight from 'react-highlight';

import type { InterceptedDatum } from '../types.js';

type Props = {
  data: Array<InterceptedDatum>
};

const renderRow = (row: InterceptedDatum, _index: number) => {
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
            <Table celled tableData={this.props.data} renderBodyRow={renderRow}>
            </Table>
        );
    }
}
