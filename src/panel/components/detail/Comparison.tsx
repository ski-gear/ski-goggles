import * as React from "react";
import { Button, Icon, Menu, Modal, Header, Form, Dropdown, Divider } from "semantic-ui-react";
import { map, reverse, filter, find, defaultTo, props, reduce, assoc } from "ramda";
import { WebRequestPayloadSnapshot, WebRequestPayload } from "./../../../types/Types";
import { ProviderCanonicalName } from "ski-providers";
import { WebRequestParam } from "ski-providers";
import { generateDiff } from "./../../Helpers";

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
  currentPayload: WebRequestPayload;
}

interface State {
  diffModalShown: boolean;
  diffData: string
}

const options = (snapshots: WebRequestPayloadSnapshot[], currentProviderName: ProviderCanonicalName): any => {
  const filtered = filter(
    (s: WebRequestPayloadSnapshot) => s.provider.canonicalName === currentProviderName,
    snapshots,
  );

  const values = map((s: WebRequestPayloadSnapshot) => {
    const image = "images/providers/" + s.provider.logo;
    return {
      value: s.browserRequestId,
      text: s.title,
      image: image,
    };
  }, filtered);

  return reverse(values);
};

const safeJsonParse = (json: string): {} => {
  try{
    return JSON.parse(json)
  } catch(e) {
    console.log(e);
    return {}
  }
}

const getBasicData = (wrps: WebRequestParam[]): {} => {
  return reduce(
    (acc: any, wrp: WebRequestParam) => {
      const val = wrp.valueType === 'json' ? safeJsonParse(wrp.value) : wrp.value
      return assoc(wrp.label, val, acc)
    },
    {},
    wrps,
  );
};

export default class Comparison extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { diffModalShown: false, diffData: '' };
  }

  handleShow = () => this.setState({ diffModalShown: true });
  handleClose = () => this.setState({ diffModalShown: false });

  handleComparison = (e: React.SyntheticEvent<any>, { value }: any) => {
    const selectedSnapshot = find(
      (s: WebRequestPayloadSnapshot) => s.browserRequestId === value,
      this.props.snapshots,
    ) as WebRequestPayloadSnapshot;
    const selected = getBasicData(selectedSnapshot.data.params);

    const current = getBasicData(this.props.currentPayload.data.params);

    const diffData = defaultTo('No Data', generateDiff(current, selected)) as string;

    this.setState({ diffModalShown: true, diffData });
  };

  render() {
    return (
      <div>
        <Button.Group color="green" basic size="mini">
          <Dropdown
            options={options(this.props.snapshots, this.props.currentPayload.provider.canonicalName)}
            text="Compare with ..."
            icon="exchange"
            labeled
            button
            className="icon"
            onChange={this.handleComparison.bind(this)}
            value="unknown"
          />
        </Button.Group>
        <Modal open={this.state.diffModalShown} onClose={this.handleClose.bind(this)}>
          <Modal.Header>Comparison Data</Modal.Header>
          <Modal.Content image className="diff-result">
            <Modal.Description>
              <div dangerouslySetInnerHTML={{__html: this.state.diffData}} ></div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.handleClose.bind(this)}>
              Done
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
