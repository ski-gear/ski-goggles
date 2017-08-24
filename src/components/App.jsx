import React from 'react';
import DataRows from './DataRows.jsx';
import MenuBar from './MenuBar.jsx';
import { Container, Button, Rail } from 'semantic-ui-react';
import type { ProviderStat } from '../types.js';

type State = {
  providerStats: Array<ProviderStat>
}

export default class App extends React.Component<State> {
    constructor(props) {
        super(props);
        this.state = {
            providerStats: [
                {
                    logo: 'snowplow.png',
                    canoncialName: 'snowplow',
                    value: 8
                },
                {
                    logo: 'adobe-audience-manager.png',
                    canoncialName: 'adobe',
                    value: 4
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <MenuBar providerStats={this.state.providerStats} />
                    <Rail attached internal position='right'>
                        <Button color='red' content='Clear' icon='heart' />
                    </Rail>
                </Container>
                <Container fluid>
                    <DataRows />
                </Container>
            </div>
        );
    }
}
