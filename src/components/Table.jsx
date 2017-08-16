import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          title: "Awesome",
          content: "Cool Stuff"
        },
        {
          title: "Awesome Again",
          content: "Cool Stuff"
        }
      ]
    }
    this.appendRow = this.appendRow.bind(this);
  };

  render() {
    return (
      <div>
        <Button icon onClick={ this.appendRow }>
          <Icon name='add' />
        </Button>
        <Accordion panels={ this.state.rows }>
        </Accordion>
      </div>
    );
  }

  appendRow() {
    let time = moment().unix();
    let row = {title: `stuff-${time}`, content: 'Awesome'}
    let nextState = this.state;
    nextState.rows.push(row);
    this.setState(nextState);
  }
};
