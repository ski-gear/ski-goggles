import * as React from "react";
import { Container, Divider, Label } from "semantic-ui-react";

import { AppVersion } from "../../Versions";
import VisibleProviders from "./containers/VisibleProviders";

type Props = {};
type State = {};

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <VisibleProviders />
        <Divider />
        <Container textAlign="center">
          <Label color="blue" tag>
            Ski Goggles - Version: {AppVersion}
          </Label>
        </Container>
      </Container>
    );
  }
}
