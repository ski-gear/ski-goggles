import * as React from "react";
import { Image, Label, Icon, Grid } from "semantic-ui-react";
import * as moment from "moment";
import { generateImageUrl } from "../Helpers";

type Props = {
  logo: string;
  title: string;
  timeStamp: number;
};

export default class Title extends React.Component<Props> {
  render() {
    return (
      <Grid>
        <Grid.Column floated="left" width={8}>
          <Icon name="dropdown" />
          <Image src={generateImageUrl(this.props.logo)} avatar spaced />
          <span>{this.props.title}</span>
        </Grid.Column>
        <Grid.Column floated="right" width={4} className="large screen only">
          <Label>{formatTime(this.props.timeStamp)}</Label>
        </Grid.Column>
      </Grid>
    );
  }
}

const formatTime = (timeStamp: number): string => {
  return moment(timeStamp).format("MMMM Do YYYY HH:mm:ss:SSS");
};
