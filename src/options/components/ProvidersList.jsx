// @flow

import React from 'react';
import { Checkbox, Table, Image, Segment, Grid, Header, Icon } from 'semantic-ui-react';
import type { Provider } from '../../types.js';

type Props = {
    data: Array<Provider>
};

const renderRow = (provider: Provider, _index: number) => {
    return {
        cells: [
            { content:  <Checkbox toggle />, textAlign: 'right', width: 1 },
            { content:  cell(provider), width: 10 }
        ]
    };
};

const cell = (provider: Provider) => {
    const name = provider.displayName;
    const logo = provider.logo;
    return (
        <span className='ui align centered'>
            <Image src={'images/providers/' + logo} avatar spaced />
            <span>{name}</span>
        </span>
    );
};

export default class ProviderList extends React.Component<Props> {
    constructor(props: any){
        super(props);
    }

    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Segment piled padded='very'>
                        <Header as='h3' textAlign='center'>
                            <Icon name='pie chart' />
                            <Header.Content>
                              Toggle Analytics Providers
                            </Header.Content>
                        </Header>
                        <Table size='large' columns='2' color='blue' renderBodyRow={renderRow} tableData={this.props.data} />
                    </Segment>
                    <Image src='/assets/images/wireframe/image.png' />
                </Grid.Column>
            </Grid>
        );
    }
}
