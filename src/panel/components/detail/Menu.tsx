import * as React from "react";
import { Button, Icon, Menu, Modal, Header, Form, Message, Divider } from "semantic-ui-react";
import { groupBy, defaultTo, map, keys, prop, sortBy, assoc, isNil } from "ramda";
import { WebRequestParam } from "ski-providers";
import { WebRequestPayload, WebRequestPayloadSnapshot } from "src/types/Types";
import Comparison from "./Comparison";

interface Props {
  payload: WebRequestPayload;
  snapshots: WebRequestPayloadSnapshot[];
  addSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface State {
  snapShotMenuText: string;
  modalOpen: boolean;
  snapShotName: string;
}

export default class DetailMenu extends React.Component<Props, State> {
  DEFAULT_LABEL = "Snapshot";
  SAVED_LABEL = "Snapshot Saved!";

  constructor(props: Props) {
    super(props);
    this.state = { snapShotMenuText: this.DEFAULT_LABEL, modalOpen: false, snapShotName: "Awesome Event" };
  }

  changeToSavedLabel() {
    this.setState({ snapShotMenuText: this.SAVED_LABEL });
    setTimeout(() => this.resetToDefaultLabel(), 2000);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  resetToDefaultLabel() {
    this.setState({ snapShotMenuText: this.DEFAULT_LABEL });
  }

  handleInputChange(e: React.SyntheticEvent<any>, { value }: any) {
    this.setState({ snapShotName: value });
  }

  onSnapshot() {
    const name = this.state.snapShotName;
    const title = isNil(name) ? "My Awesome Event" : name;
    const wrps: WebRequestPayloadSnapshot = assoc("title", title, this.props.payload);
    this.props.addSnapshot(wrps);
    this.changeToSavedLabel();
    this.handleClose();
  }

  render() {
    return (
      <Menu compact size="mini" secondary>
        <Menu.Item>
          <Button color="green" basic onClick={this.handleOpen.bind(this)}>
            <Icon name="photo" />
            {this.state.snapShotMenuText}
          </Button>
          <Modal open={this.state.modalOpen} onClose={this.handleClose} basic size="small">
            <Modal.Content>
              <Header icon="save" content="Save Snapshot" inverted />
              <Divider />
              <Form inverted>
                <Form.Input
                  placeholder="Give it a name"
                  name="snapshotName"
                  value={this.state.snapShotName}
                  onChange={this.handleInputChange.bind(this)}
                />
                <Button color="green" onClick={this.onSnapshot.bind(this)} inverted floated="left">
                  <Icon name="checkmark" /> Save
                </Button>
                <Button color="red" onClick={this.handleClose.bind(this)} inverted basic floated="right" size="mini">
                  <Icon name="cancel" /> Cancel
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Menu.Item>
        <Menu.Item>
          <Comparison
            snapshots={this.props.snapshots}
            currentPayload={this.props.payload}
          />
        </Menu.Item>
      </Menu>
    );
  }
}
