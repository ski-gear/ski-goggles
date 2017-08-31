// @flow

import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import Highlight from 'react-highlight';
import { groupBy, defaultTo, map, keys, prop } from 'ramda';

import type { WebRequestParam } from '../types.js';

type Props = {
  data: Array<WebRequestParam>
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

const groupedCategories = (rows: Array<WebRequestParam>) => {
    return groupBy(
        // $FlowFixMe
        (row) => defaultTo('Data', row.category),
        rows
    );
};

const wrappedTable = (data: {[string]: Array<WebRequestParam>}) => {
    const categories = keys(data);

    return map(
        (category) => {
            return (
                <div>
                    <Header as='h4'>{category}</Header>
                    <Table celled tableData={prop(category, data)} renderBodyRow={renderRow}>
                    </Table>
                </div>
            );
        },
        categories
    );
};

export default class Detail extends React.Component<Props> {
    render() {
        const grouped = groupedCategories(this.props.data);
        return (
            <div>{wrappedTable(grouped)}</div>
        );
    }
}
