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
  removeSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface State {
  snapShotMenuText: string;
  modalSaveOpen: boolean;
  modalCompareOpen: boolean;
  snapShotName: string;
}

export default class DetailMenu extends React.Component<Props, State> {
  DEFAULT_LABEL = "Snapshot";
  SAVED_LABEL = "Snapshot Saved!";

  constructor(props: Props) {
    super(props);
    this.state = {
      snapShotMenuText: this.DEFAULT_LABEL,
      modalSaveOpen: false,
      snapShotName: "Awesome Event",
      modalCompareOpen: false,
    };
  }

  changeToSavedLabel() {
    this.setState({ snapShotMenuText: this.SAVED_LABEL });
    setTimeout(() => this.resetToDefaultLabel(), 2000);
  }

  handleSaveOpen = () => this.setState({ modalSaveOpen: true });

  handleSaveClose = () => this.setState({ modalSaveOpen: false });

  handleCompareOpen = () => this.setState({ modalCompareOpen: true });

  handleCompareClose = () => this.setState({ modalCompareOpen: false });

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
    this.handleSaveClose();
  }

  render() {
    return (
      <Menu compact size="mini" secondary>
        <Menu.Item>
          <Button color="green" basic onClick={this.handleSaveOpen.bind(this)}>
            <Icon name="photo" />
            {this.state.snapShotMenuText}
          </Button>
          <Modal open={this.state.modalSaveOpen} onClose={this.handleSaveClose} basic size="small">
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
                <Button
                  color="red"
                  onClick={this.handleSaveClose.bind(this)}
                  inverted
                  basic
                  floated="right"
                  size="mini"
                >
                  <Icon name="cancel" /> Cancel
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Menu.Item>
        <Menu.Item>
          <Button color="green" basic onClick={this.handleCompareOpen.bind(this)}>
            <Icon name="exchange" />
            Compare
          </Button>
          <Modal open={this.state.modalCompareOpen} onClose={this.handleCompareClose} size="small">
            <Modal.Content>
              <Comparison snapshots={this.props.snapshots} currentPayload={this.props.payload} removeSnapshot={this.props.removeSnapshot}/>
            </Modal.Content>
          </Modal>
        </Menu.Item>
      </Menu>
    );
  }
}
