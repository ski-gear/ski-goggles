import * as React from "react";
import { Button, Icon, Menu, Modal, Header, Form, Table, Divider, Popup, Segment, Transition } from "semantic-ui-react";
import { map, reverse, filter, find, defaultTo, props, reduce, assoc } from "ramda";
import { WebRequestPayloadSnapshot, WebRequestPayload } from "./../../../types/Types";
import { ProviderCanonicalName } from "ski-providers";
import { WebRequestParam } from "ski-providers";
import { generateDiff } from "./../../Helpers";

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
  currentPayload: WebRequestPayload;
  removeSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface State {
  diffTableShown: boolean;
  diffDataShown: boolean;
  diffData: string;
}

const hiddenClass = (hidden: boolean): string => (hidden ? "" : "hidden");

const safeJsonParse = (json: string): {} => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.log('JSON parse error', e);
    return {};
  }
};

const getBasicData = (wrps: WebRequestParam[]): {} => {
  return reduce(
    (acc: any, wrp: WebRequestParam) => {
      const val = wrp.valueType === "json" ? safeJsonParse(wrp.value) : wrp.value;
      return assoc(wrp.label, val, acc);
    },
    {},
    wrps,
  );
};

export default class Comparison extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { diffDataShown: false, diffTableShown: true, diffData: "" };
  }

  handleComparisonClose = () => this.setState({ diffDataShown: false, diffTableShown: true });

  handleComparison = (requestId: string): Function => {
    return (e: React.SyntheticEvent<any>, a: any) => {
      const selectedSnapshot = find(
        (s: WebRequestPayloadSnapshot) => s.browserRequestId === requestId,
        this.props.snapshots,
      ) as WebRequestPayloadSnapshot;
      const selected = getBasicData(selectedSnapshot.data.params);

      const current = getBasicData(this.props.currentPayload.data.params);

      const diffData = defaultTo("No differences found.", generateDiff(current, selected)) as string;

      this.setState({ diffDataShown: true, diffTableShown: false, diffData });
    };
  };

  handleRemove = (wrps: WebRequestPayloadSnapshot): Function => {
    return (): void => {
      this.props.removeSnapshot(wrps);
    }
  }

  options = (): any => {
    const snapshots = this.props.snapshots;
    const currentProviderName = this.props.currentPayload.provider.canonicalName;
    const filtered = filter(
      (s: WebRequestPayloadSnapshot) => s.provider.canonicalName === currentProviderName,
      snapshots,
    );

    const values = map((s: WebRequestPayloadSnapshot) => {
      const image = "images/providers/" + s.provider.logo;
      return (
        <Table.Row key={s.browserRequestId}>
          <Table.Cell singleLine>{s.title}</Table.Cell>
          <Table.Cell>
            <Popup
              trigger={
                <Icon
                  link
                  size="large"
                  color="green"
                  name="window restore"
                  value={s.browserRequestId}
                  onClick={this.handleComparison.bind(this)(s.browserRequestId)}
                />
              }
              content="Compare with this snapshot"
              size="tiny"
            />
          </Table.Cell>
          <Table.Cell>
            <Popup
              trigger={<Icon link size="large" color="red" name="trash" onClick={this.handleRemove(s)}/>}
              content="Remove this snapshot"
              size="tiny"
            />
          </Table.Cell>
        </Table.Row>
      );
    }, filtered);

    return reverse(values);
  };

  render() {
    const tableRows = this.options();

    return (
      <div>
        <div className={hiddenClass(this.state.diffTableShown)}>
          <Header size="small">
            <Icon name="window restore" />
            Compare the current event with a saved Snapshot
          </Header>
          <Table padded color="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Snapshot Name</Table.HeaderCell>
                <Table.HeaderCell colSpan={2} />
              </Table.Row>
            </Table.Header>
            <Table.Body>{map(e => e, tableRows)}</Table.Body>
          </Table>
        </div>
        <div className={hiddenClass(this.state.diffDataShown)}>
          <Segment stacked className="diff-result">
            <Header size="tiny">
              <Icon name="file text outline" />
              Comparison Report
            </Header>
            <div dangerouslySetInnerHTML={{ __html: this.state.diffData }} />
            <Divider />
            <Button color="green" onClick={this.handleComparisonClose.bind(this)} inverted floated="left">
              <Icon name="checkmark" /> Done
            </Button>
          </Segment>
        </div>
      </div>
    );
  }
}
