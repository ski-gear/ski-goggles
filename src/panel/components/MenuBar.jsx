// @flow

import React from 'react';
import { Menu, Image, Button, Label, Icon } from 'semantic-ui-react';
import{ AppVersion } from '../versions';

type Props = {
  clear: any
};

export default class MenuBar extends React.Component<Props> {
    render(){
        return(
            <Menu fixed='top' size='mini'>
                <Menu.Item name='home'>
                    <Image src='images/ski-goggles-48.png' size='mini' shape='circular' bordered />
                    <Label pointing='left'>
                        <Icon name='tag' />
                        {AppVersion}
                    </Label>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item name='clear'>
                        <Button circular size='small' color='red' icon='trash' onClick={this.props.clear} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}
