import * as moment from "moment";
import * as React from "react";
import { Grid, Icon, Image, Label } from "semantic-ui-react";
import { generateImageUrl } from "../Helpers";

interface Props {
  logo: string;
  title: string;
  timeStamp: number;
  primaryInfo: string;
}

export default class Title extends React.Component<Props> {
  public render() {
    return (
      <Grid container columnspacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid.Column floated="left" width={5}>
          <Icon name="dropdown" />
          <Image src={generateImageUrl(this.props.logo)} avatar spaced />
          <span>{this.props.title}</span>
        </Grid.Column>
        <Grid.Column floated="left" width={3}>
          <span>{this.props.primaryInfo}</span>
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
          <Label name="timeStamp">{formatTime(this.props.timeStamp)}</Label>
        </Grid.Column>  
      </Grid>
    );
  }
}

const formatTime = (timeStamp: number): string => {
  return moment(timeStamp).format("MMMM Do YYYY HH:mm:ss:SSS");
};
