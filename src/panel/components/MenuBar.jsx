// @flow

import React from 'react';
import { Menu, Image, Button, Label, Icon } from 'semantic-ui-react';
import{ AppVersion } from '../versions';

type Props = {
  clear: any
};

type State = {
  chromeId: string
};

export default class MenuBar extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            chromeId: ''
        };
    }

    openOptions(){
        const chromeId = this.state.chromeId;
        chrome.runtime.sendMessage(chromeId, 'open-options-tab');
        console.log('sending message to open options');
    }

    componentDidMount() {
        document.addEventListener('chromeId', (data: any) => {
            this.setState({chromeId: data.detail.chromeId});
        });
    }

    render() {
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
                    <Menu.Item name='options'>
                        <Icon color='green' name='options' size='big' onClick={this.openOptions.bind(this)} />
                    </Menu.Item>
                    <Menu.Item name='clear'>
                        <Button circular size='small' color='red' icon='trash' onClick={this.props.clear} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}
