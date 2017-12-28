import * as React from "react";
import { Button, Icon, Menu, Modal, Header } from "semantic-ui-react";
import { groupBy, defaultTo, map, keys, prop, sortBy, assoc } from "ramda";
import { WebRequestParam } from "ski-providers";
import { WebRequestPayload, WebRequestPayloadSnapshot } from "src/types/Types";

interface Props {
  payload: WebRequestPayload;
  addSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface State {
  snapShotMenuText: string;
  modalOpen: boolean;
}

export default class DetailMenu extends React.Component<Props, State> {
  DEFAULT_LABEL = "Save Snapshot!";
  SAVED_LABEL = "Snapshot Saved!";

  constructor(props: Props) {
    super(props);
    this.state = { snapShotMenuText: this.DEFAULT_LABEL, modalOpen: false };
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

  onSnapshot() {
    const wrps: WebRequestPayloadSnapshot = assoc("title", "stuff", this.props.payload);
    this.handleOpen();
    this.props.addSnapshot(wrps);
    this.changeToSavedLabel();
  }

  render() {
    return (
      <Menu compact size="mini" secondary>
        <Menu.Item>
          <Modal
            trigger={
              <Button basic onClick={this.onSnapshot.bind(this)}>
                <Icon name="photo" />
                {this.state.snapShotMenuText}
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header icon="browser" content="Cookies policy" />
            <Modal.Content>
              <h3>This website uses cookies to ensure the best user experience.</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleClose} inverted>
                <Icon name="checkmark" /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
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
}
