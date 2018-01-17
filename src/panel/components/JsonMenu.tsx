import * as React from "react";
import { Button, Icon, Menu } from "semantic-ui-react";

type State = {
  copyText: string;
};

type Props = {
  value: string;
};

export default class JsonMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { copyText: "Copy" };
  }

  showCopiedLabel() {
    this.setState({ copyText: "Copied!" });
    setTimeout(() => this.showCopyLabel(), 2000);
  }

  showCopyLabel() {
    this.setState({ copyText: "Copy" });
  }

  onCopy() {
    this.showCopiedLabel();
  }

  render() {
    return (
      <Menu compact size="mini" secondary>
        <Menu.Item>
          <Button basic onClick={this.onCopy.bind(this)} data-clipboard-text={this.props.value} className="clipBoard">
            <Icon name="copy" />
            {this.state.copyText}
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}
