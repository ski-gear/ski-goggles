// @flow

import React from 'react';
import { Image } from 'semantic-ui-react'

type Props = {
  logo: string,
  name: string
};

export default class Title extends React.Component<Props> {
  render() {
    return (
      <span>
        <Image src={"images/providers/" + this.props.logo} avatar />
        <span>{this.props.name}</span>
      </span>
    );
  };
};
