import * as React from "react";
import { Button, Icon, Menu, Modal, Header, Form, Message, Divider, Popup } from "semantic-ui-react";
import { groupBy, defaultTo, map, keys, prop, sortBy, assoc, isEmpty, merge } from "ramda";
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
  modalSaveOpen: boolean;
  modalCompareOpen: boolean;
  snapShotName: string;
}

export default class DetailMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalSaveOpen: false,
      snapShotName: "Awesome Event",
      modalCompareOpen: false,
    };
  }

  handleSaveOpen = () => this.setState({ modalSaveOpen: true });

  handleSaveClose = () => this.setState({ modalSaveOpen: false });

  handleCompareOpen = () => this.setState({ modalCompareOpen: true });

  handleCompareClose = () => this.setState({ modalCompareOpen: false });

  handleInputChange(e: React.SyntheticEvent<any>, { value }: any) {
    this.setState({ snapShotName: value });
  }

  disableAddSnapShotButton = (): boolean => this.state.snapShotName.length < 1;

  onSnapshot() {
    const name = this.state.snapShotName;
    const title = isEmpty(name) ? "Some Event" : name;
    const snapshotTimeStamp = Date.now();
    const snapshotFields = {
      title,
      snapshotTimeStamp,
    };
    const wrps: WebRequestPayloadSnapshot = merge(this.props.payload, snapshotFields);
    this.props.addSnapshot(wrps);
    this.handleSaveClose();
  }

  disableCompareButton = (): boolean => this.props.snapshots.length < 1;
  compareButtonPopupText = (): string =>
    this.disableCompareButton() ? "No Snapshots available to compare" : "Click to compare";

  render() {
    return (
      <Menu compact size="mini" secondary>
        <Menu.Item>
          <Popup
            trigger={
              <Button color="green" basic onClick={this.handleSaveOpen.bind(this)}>
                <Icon name="photo" />
                Snapshot
              </Button>
            }
            content="Save a snapshot of this event"
            size="tiny"
          />
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
                  maxlength={32}
                />
                <Button
                  color="green"
                  onClick={this.onSnapshot.bind(this)}
                  inverted
                  floated="left"
                  disabled={this.disableAddSnapShotButton.bind(this)()}
                >
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
          <Popup
            trigger={
              <Button
                color="green"
                basic
                onClick={this.handleCompareOpen.bind(this)}
                disabled={this.disableCompareButton()}
              >
                <Icon name="window restore" />
                Compare
              </Button>
            }
            content={this.compareButtonPopupText.bind(this)()}
            size="tiny"
          />
          <Modal open={this.state.modalCompareOpen} onClose={this.handleCompareClose} size="small">
            <Modal.Content>
              <Comparison
                snapshots={this.props.snapshots}
                currentPayload={this.props.payload}
                removeSnapshot={this.props.removeSnapshot}
              />
            </Modal.Content>
          </Modal>
        </Menu.Item>
      </Menu>
    );
  }
}
