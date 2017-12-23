import * as React from "react";
import { Menu, Image, Icon, Popup } from "semantic-ui-react";
import { RunTimeMessage } from "../../types/Types";
import { OPEN_OPTIONS_TAB, OPEN_ISSUES_PAGE } from "../../Constants";

type Props = {
  clear: any;
};

type State = {
  chromeId: string;
};

export default class MenuBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chromeId: "",
    };
  }

  sendRuntimeMessage(msg: RunTimeMessage) {
    const chromeId = this.state.chromeId;
    chrome.runtime.sendMessage(chromeId, msg);
  }

  openOptions() { this.sendRuntimeMessage(OPEN_OPTIONS_TAB); }

  openIssues() { this.sendRuntimeMessage(OPEN_ISSUES_PAGE); }

  componentDidMount() {
    document.addEventListener("chromeId", (data: any) => {
      this.setState({ chromeId: data.detail.chromeId });
    });
  }

  render() {
    return <Menu fixed="top" size="mini">
        <Menu.Item name="home">
          <Image src="images/ski-goggles-48.png" size="mini" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="options">
            <Popup 
              trigger={<Icon link size="large" color="green" name="options" onClick={this.openOptions.bind(this)} />}
              content="Open Options Page"
              size='tiny'
            />
          </Menu.Item>
          <Menu.Item name="clear">
            <Popup 
              trigger={<Icon link size="large" color="red" name="trash" onClick={this.props.clear} />}
              content="Clear All Events"
              size='tiny'
            />
          </Menu.Item>
          <Menu.Item name="bug">
            <Popup 
              trigger={<Icon link size="large" color="green" name="bug" onClick={this.openIssues.bind(this)} />}
              content="Report Bug/Feature Request"
              size='tiny'
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>;
  }
}
