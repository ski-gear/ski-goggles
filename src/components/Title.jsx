import React from 'react';
import { Image } from 'semantic-ui-react'

export default class Title extends React.Component {
  render() {
    return (
      <span>
        <Image src='images/providers/snowplow.png' avatar />
        <span>Snowplow</span>
      </span>
    );
  };
};
