import * as React from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import { groupBy, defaultTo, map, keys, prop, sortBy } from "ramda";
import { WebRequestParam } from "ski-providers";
import { WebRequestPayload } from "src/types/Types";

interface Props {
  payload: WebRequestPayload;
  addSnapshot: (wrp: WebRequestPayload) => void;
}

interface State {
  snapShotMenuText: string;
}

export default class DetailMenu extends React.Component<Props, State> {

  DEFAULT_LABEL = 'Save Snapshot';
  SAVED_LABEL = 'Snapshot Saved!';

  constructor(props: Props) {
    super(props);
    this.state = { snapShotMenuText: this.DEFAULT_LABEL }
  }

  changeToSavedLabel() {
    this.setState({ snapShotMenuText: this.SAVED_LABEL });
    setTimeout(
      () => this.resetToDefaultLabel(),
      2000
    );
  }

  resetToDefaultLabel(){
    this.setState({ snapShotMenuText: this.DEFAULT_LABEL });
  }

  onSnapshot() {
    this.props.addSnapshot(this.props.payload);
    this.changeToSavedLabel();
  }

  render() {
    return (
      <Menu compact size="mini" secondary>
        <Menu.Item>
          <Button basic onClick={this.onSnapshot.bind(this)}>
            <Icon name="photo" />
            {this.state.snapShotMenuText}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button basic>
            <Icon name="exchange" />
            Compare 
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
};
