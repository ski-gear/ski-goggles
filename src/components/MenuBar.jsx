// @flow

import React from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react';

type Props = {
  clearAll: any
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
                        <Icon color='red' name='trash' size='big' onClick={this.props.clearAll}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}
