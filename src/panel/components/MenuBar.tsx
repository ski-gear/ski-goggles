import * as React from "react";
import { Icon, Image, Menu, Popup } from "semantic-ui-react";

import { OPEN_ISSUES_PAGE, OPEN_OPTIONS_TAB } from "../../Constants";
import { AppVersion } from "../../Versions";
import { SendRuntimeMessage } from "../Helpers";

interface Props {
  clear: () => void;
  chromeId: string;
}

interface State {}

export default class MenuBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chromeId: "",
    };
  }

  public openOptions() {
    SendRuntimeMessage(this.props.chromeId, OPEN_OPTIONS_TAB, {});
  }

  public openIssues() {
    SendRuntimeMessage(this.props.chromeId, OPEN_ISSUES_PAGE, {});
  }

  public versionInfo(): string {
    return `Version: ${AppVersion}`;
  }

  public render() {
    return (
      <Menu fixed="top" size="mini">
        <Menu.Item name="home">
          <Popup
            trigger={<Image src="images/ski-goggles-48.png" size="mini" />}
            content={this.versionInfo()}
            size="tiny"
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="bug-menu">
            <Popup
              trigger={<Icon link size="large" color="green" name="bug" onClick={this.openIssues.bind(this)} />}
              content="Report Bug/Feature Request"
              size="tiny"
            />
          </Menu.Item>
          <Menu.Item name="options-menu">
            <Popup
              trigger={<Icon link size="large" color="green" name="options" onClick={this.openOptions.bind(this)} />}
              content="Open Options Page"
              size="tiny"
            />
          </Menu.Item>
          <Menu.Item name="delete-menu">
            <Popup
              trigger={<Icon link size="large" color="red" name="trash" onClick={this.props.clear} />}
              content="Clear All Events"
              size="tiny"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
