import React from 'react';
import Table from './Table.jsx';
import { Container } from 'semantic-ui-react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Table />
        </Container>
      </div>
    );
  }
};
