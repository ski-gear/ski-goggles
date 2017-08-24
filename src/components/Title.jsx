// @flow

import React from 'react';
import { Image, Label } from 'semantic-ui-react';
import moment from 'moment';

type Props = {
  logo: string,
  name: string,
  timeStamp: number
};

export default class Title extends React.Component<Props> {
    render() {
        return (
            <span>
                <Image src={'images/providers/' + this.props.logo} avatar spaced />
                <span>{this.props.name}</span>
                <Label>{formatTime(this.props.timeStamp)}</Label>
            </span>
        );
    }
}

const formatTime = (timeStamp: number): string => {
    return moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a');
};
