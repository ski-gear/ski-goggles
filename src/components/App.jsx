import React from 'react';
import MenuContainer from './containers/MenuContainer.jsx';
import { Container } from 'semantic-ui-react';

import AddWebRequest from './containers/AddWebRequest.jsx';
import VisibleWebRequests from './containers/VisibleWebRequests.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <AddWebRequest />
                <Container fluid>
                    <MenuContainer />
                </Container>
                <Container fluid className='data-rows'>
                    <VisibleWebRequests />
                </Container>
            </div>
        );
    }
}
