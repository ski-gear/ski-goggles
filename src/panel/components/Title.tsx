import * as moment from "moment";
import * as React from "react";
import { Grid, Icon, Image, Label } from "semantic-ui-react";
import { WebRequestPayload } from "src/types/Types";

import { generateImageUrl } from "../Helpers";

interface Props {
  logo: string;
  title: string;
  timeStamp: number;
  provider: string;
  payload: WebRequestPayload;
}

const displayKeyInfo = (
  provider: string,
  payload: WebRequestPayload,
  title: string
): string => {
  try {
    if (provider === "Snowplow") {
      if (title === "Page View") {
        const pageSchemaVersion = JSON.parse(
          payload.data.data.filter(
            (item) => item.label === "Context Payload"
          )[0].value
        )
          .data[0].schema.match(/\d/g)
          .join("-");
        const name = "Version: ";
        const result = name.concat(pageSchemaVersion);
        return result;
      } else {
        const eventSchemaVersion = JSON.parse(
          payload.data.data.filter((item) => item.label === "Event Payload")[0]
            .value
        )
          .data.schema.match(/\d/g)
          .join("-");
        const name = "Version: ";
        const result = name.concat(eventSchemaVersion);
        return result;
      }
    } else if (provider === "Adobe Analytics AppMeasurement") {
      const visitorNamespace = payload.data.data.filter(
        (item) => item.label === "Visitor namespace"
      )[0].value;
      const name = "Visitor: ";
      const result = name.concat(visitorNamespace);
      return result;
    } else if (provider === "Google Analytics") {
      const trackingId = payload.data.data.filter(
        (item) => item.label === "Tracking ID"
      )[0].value;
      const name = "Id: ";
      const result = name.concat(trackingId);
      return result;
    }
  } catch (error) {
    return "";
  }
  return "";
};

export default class Title extends React.Component<Props> {
  public render() {
    return (
      <Grid>
        <Grid.Column floated="left" width={8}>
          <Icon name="dropdown" />
          <Image src={generateImageUrl(this.props.logo)} avatar spaced />
          <Label size="small" name="title">
            {this.props.title}
          </Label>
        </Grid.Column>
        <Grid.Column floated="left" width={4}>
          <Label size="small" name="keyInfo">
            {displayKeyInfo(
              this.props.provider,
              this.props.payload,
              this.props.title
            )}
          </Label>
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
          <Label size="mini" name="timeStamp">
            {formatTime(this.props.timeStamp)}
          </Label>
        </Grid.Column>
      </Grid>
    );
  }
}

const formatTime = (timeStamp: number): string => {
  return moment(timeStamp).format("MMM Do YYYY HH:mm:ss");
};