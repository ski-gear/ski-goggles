import * as React from "react";
import { Button, Icon, Menu, Modal, Header, Form, Dropdown } from "semantic-ui-react";
import { map, reverse } from "ramda";
import { WebRequestPayloadSnapshot } from "src/types/Types";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
}

interface State {}

const renderItems = (snapshots: WebRequestPayloadSnapshot[]): JSX.Element[] => {
  return map(
    (s: WebRequestPayloadSnapshot) => {
      const image = "images/providers/" + s.provider.logo;
      return <Dropdown.Item key={s.browserRequestId} value={s.browserRequestId} text={s.title} image={image} />
    },
    snapshots
  )
};

export default class Comparison extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Dropdown text="Compare" icon="exchange" labeled button className="icon">
        <Dropdown.Menu>
          <Dropdown.Header content="Compare it with one of the following Snapshots" />
          {renderItems(reverse(this.props.snapshots))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
