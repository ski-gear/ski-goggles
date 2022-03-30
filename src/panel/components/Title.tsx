import * as moment from "moment";
import * as React from "react";
import { Grid, Icon, Image, Label, Header } from "semantic-ui-react";
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

const formatTime = (timeStamp: number): string => {
  return moment(timeStamp).format("HH:mm:ss A, D/M");
};


export default class Title extends React.Component<Props> {
  public render() {
    return (
      <Grid columns="equal" verticalAlign="middle" centered>
        <Grid.Column name="logo" width={9}>
          <Icon name="dropdown" />
          <Image src={generateImageUrl(this.props.logo)} avatar spaced />
          <Label as="a"
            basic
            size="small"
            color="blue"
            name="timeStamp"
            width={4}
          >
            {this.props.title}
          </Label>
        </Grid.Column>
        <Grid.Column name="key-info">
          <Header name="keyInfo" size="small" as="h5" color="blue">
            {displayKeyInfo(
              this.props.provider,
              this.props.payload,
              this.props.title
            )}
          </Header>
        </Grid.Column>
        <Grid.Column name="timestamp">
          <Label
            as="a"
            basic
            size="small"
            color="blue"
            name="timeStamp"
            width={4}
          >
            {formatTime(this.props.timeStamp)}
          </Label>
        </Grid.Column>
      </Grid>
    );
  }
}

