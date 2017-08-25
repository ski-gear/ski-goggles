// @flow

import React from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react';
// import { map } from 'ramda';
import type { ProviderStat } from '../types.js';

type Props = {
  providerStats: Array<ProviderStat>
};

export default class MenuBar extends React.Component<Props> {
    render(){
        return(
            <Menu fixed='top' size='mini'>
                <Menu.Item name='home'>
                    <Image src='images/ski-goggles-48.png' size='mini' shape='circular' bordered /> 
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item name='clear'>
                        <Icon color='red' name='trash' size='big'/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}
