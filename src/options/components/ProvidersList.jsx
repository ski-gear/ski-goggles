// @flow

import React from 'react';
import { Checkbox, Table, Image, Segment, Grid, Header, Icon, Message, Button } from 'semantic-ui-react';
import type { UserProviderSetting } from '../../types.js';
import { map, curry } from 'ramda';

import { lookup } from '../../providers/helpers';

type Props = {
  data: Array<UserProviderSetting>,
  onEnableProvider: any,
  onDisableProvider: any
};

const onToggle = curry((props: Props, _event: any, data: any): void => {
    data.checked ? props.onEnableProvider(data.value) : props.onDisableProvider(data.value);
});

const renderRows = (props: Props) => {
    return map(
        (providerSetting) => {
            const provider = lookup(providerSetting.providerCanonicalName);
            if(provider){
                return (
                    <Table.Row key={providerSetting.providerCanonicalName}>
                        <Table.Cell width='5' textAlign='right'>
                            <span>
                                <Image src={'images/providers/' + provider.logo} avatar spaced />
                                <span>{provider.displayName}</span>
                            </span>
                        </Table.Cell>
                        <Table.Cell textAlign='left' width='1'>
                            <Checkbox toggle onChange={onToggle(props)} value={providerSetting.providerCanonicalName} checked={providerSetting.enabled}/>
                        </Table.Cell>
                        <Table.Cell textAlign='left' width='1'>
                            <Button circular icon='setting' size='tiny' />
                        </Table.Cell>
                        <Table.Cell width='3'>
                        </Table.Cell>
                    </Table.Row>
                );
            }
        },
        props.data
    );
};

export default class ProviderList extends React.Component<Props> {
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Segment padded='very'>
                        <Header as='h3' textAlign='center'>
                            <Icon name='pie chart' />
                            <Header.Content>
                              Toggle Analytics Providers
                            </Header.Content>
                        </Header>
                        <Table size='large' columns='2' color='blue'>
                            <Table.Body>
                                { renderRows(this.props) }
                            </Table.Body>
                        </Table>
                        <Message warning>
                            <Icon name='trademark' />
                            <Icon name='copyright' />
                            All product names, logos, and brands are property of their respective owners.
                            All company, product, and service names used in this browser extension are for identification purposes only.
                            Use of these names, logos, and brands does not imply endorsement.
                        </Message>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
