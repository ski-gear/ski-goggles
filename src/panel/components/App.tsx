import * as React from "react";
import MenuContainer from "./containers/MenuContainer";
import { Container } from "semantic-ui-react";
import * as Clipboard from "clipboard";

import DocumentContainer from "./containers/DocumentContainer";
import WebRequestsContainer from "./containers/WebRequestsContainer";
import { SyncSnapshots } from './../actions/Snapshots'
import { NewSnapshotPostMessage } from "./../../Constants";
import { WebRequestPayloadSnapshot } from "src/types/Types";

export default class App extends React.Component {
  componentDidMount() {
    new Clipboard(".clipBoard");
  }

  render() {
    return (
      <div>
        <DocumentContainer />
        <Container fluid>
          <MenuContainer />
        </Container>
        <Container fluid className="data-rows">
          <WebRequestsContainer />
        </Container>
      </div>
    );
  }
}
