import * as React from "react";
import { Container, Divider, Label } from "semantic-ui-react";

import { AppVersion } from "../../Versions";
import VisibleProviders from "./containers/VisibleProviders";

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
  public render() {
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
