import React from 'react';
import DataRows from './DataRows.jsx';
import { Container } from 'semantic-ui-react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Container fluid>
          <DataRows />
        </Container>
      </div>
    );
  }
};
