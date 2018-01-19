import * as Clipboard from "clipboard";
import * as React from "react";
import { Container } from "semantic-ui-react";

import DocumentContainer from "./containers/DocumentContainer";
import MenuContainer from "./containers/MenuContainer";
import WebRequestsContainer from "./containers/WebRequestsContainer";

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
