// @flow

import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import Highlight from 'react-highlight';
// $FlowFixMe
import { groupBy, defaultTo, map, keys, prop, sortBy, identity } from 'ramda';

import type { WebRequestParam } from '../../types.js';

type Props = {
  data: Array<WebRequestParam>
};

const renderRows = (rows: Array<WebRequestParam>) => {
    return map(
        (row) => {
            return (
                <Table.Row key={row.label}>
                    <Table.Cell>
                        { row.label }
                    </Table.Cell>
                    <Table.Cell>
                        { format(row.valueType, row.value) }
                    </Table.Cell>
                </Table.Row>
            );
        },
        rows
    );
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
        (row) => defaultTo('General Data', row.category),
        rows
    );
};

const wrappedTable = (data: {[string]: Array<WebRequestParam>}) => {
    const categories = sortBy(identity, keys(data));

    return map(
        (category) => {
            return (
                <div key={category}>
                    <Header as='h4'>{category}</Header>
                    <Table celled>
                        <Table.Body>
                            { renderRows(prop(category, data)) }
                        </Table.Body>
                    </Table>
                    <br/>
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
