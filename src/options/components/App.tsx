import * as React from "react";
import { Label, Container, Divider } from "semantic-ui-react";
import VisibleProviders from "./containers/VisibleProviders";
import { AppVersion } from "../../Versions";

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
