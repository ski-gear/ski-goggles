// @flow

import React from 'react';
import { Table, Header, Container, Icon, Menu } from 'semantic-ui-react';
import Highlight from 'react-highlight';
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

const renderMenuBar = (value: string) => {
    return (
        <Menu compact icon size='mini'>
            <Menu.Item name='copy' data-clipboard-text={value} className='clipBoard'>
                <Icon name='copy' />
            </Menu.Item>
        </Menu>
    );
};

const format = (valueType: string, value: string) => {
    if(valueType == 'json'){
        return(
            <Container fluid>
						    { renderMenuBar(value) }
                <Highlight className='json'>
                    {value}
                </Highlight>
            </Container>
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
                            { 
                                // $FlowFixMe
                                renderRows(prop(category, data)) 
                            }
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
