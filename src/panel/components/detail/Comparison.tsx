import * as moment from "moment";
import { assoc, defaultTo, filter, find, map, propOr, props, reduce, reverse } from "ramda";
import * as React from "react";
import { Button, Divider, Header, Icon, Image, Label, Menu, Popup, Segment, Table } from "semantic-ui-react";
import { WebRequestParam } from "ski-providers";

import { WebRequestPayload, WebRequestPayloadSnapshot } from "./../../../types/Types";
import { generateDiff, generateImageUrl } from "./../../Helpers";

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
  currentPayload: WebRequestPayload;
  removeSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface State {
  diffTableShown: boolean;
  diffDataShown: boolean;
  formattedDiffData: string;
  rawDiffData: {};
  copyText: string;
}

const hiddenClass = (hidden: boolean): string => (hidden ? "" : "hidden");

const safeJsonParse = (json: string): {} => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.log("JSON parse error", e);
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
    this.state = {
      diffDataShown: false,
      diffTableShown: true,
      formattedDiffData: "",
      rawDiffData: {},
      copyText: "Copy Raw",
    };
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

      const diff = generateDiff(current, selected);
      const formattedDiffData = defaultTo("＼（＾ ＾）／ No difference. Great job!", diff.formatted) as string;
      const rawDiffData = defaultTo({}, diff.raw) as {};

      this.setState({ diffDataShown: true, diffTableShown: false, formattedDiffData, rawDiffData });
    };
  };

  handleRemove = (wrps: WebRequestPayloadSnapshot): Function => {
    return (): void => {
      this.props.removeSnapshot(wrps);
    };
  };

  filteredSnapshots = (): WebRequestPayloadSnapshot[] => {
    const snapshots = this.props.snapshots;
    const currentProviderName = this.props.currentPayload.provider.canonicalName;
    return filter(
      (s: WebRequestPayloadSnapshot) => s.provider.canonicalName === currentProviderName,
      this.props.snapshots,
    );
  };

  options = (): JSX.Element[] => {
    const filtered = this.filteredSnapshots();
    const values = map((s: WebRequestPayloadSnapshot) => {
      const eventTitle = s.data.meta.title || 'Unknown Event';
      const time = moment(s.snapshotTimeStamp).fromNow();
      return (
        <Table.Row key={s.browserRequestId}>
          <Table.Cell>
            <Image avatar src={generateImageUrl(s.provider.logo)} />
               { s.title } ({ eventTitle }) &nbsp;
            <Label size="mini" basic>
              {time}
            </Label>
          </Table.Cell>
          <Table.Cell collapsing textAlign="right">
            <Popup
              trigger={
                <Icon
                  link
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
          <Table.Cell collapsing textAlign="right">
            <Popup
              trigger={<Icon link color="red" name="trash" onClick={this.handleRemove(s)} />}
              content="Remove this snapshot"
              size="tiny"
            />
          </Table.Cell>
        </Table.Row>
      );
    }, filtered);

    return reverse(values);
  };

  table = (): JSX.Element => {
    return (
      <Table padded color="green">
        <Table.Body>{map(e => e, this.options())}</Table.Body>
      </Table>
    );
  };

  noRows = (): JSX.Element => {
    return <Segment stacked>¯\_(ツ)_/¯ No Snapshots to compare.</Segment>;
  };

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
      <div>
        <div className={hiddenClass(this.state.diffTableShown)}>
          <Header size="small">
            <Icon name="window restore" />
            Compare the current event with a saved Snapshot
          </Header>
          {this.filteredSnapshots.bind(this)().length > 0 ? this.table.bind(this)() : this.noRows.bind(this)()}
        </div>
        <div className={hiddenClass(this.state.diffDataShown)}>
          <Segment stacked className="diff-result">
            <Header size="tiny">
              <Icon name="file text outline" />
              Comparison Report
            </Header>
            <div dangerouslySetInnerHTML={{ __html: this.state.formattedDiffData }} />
            <Divider />
            <Menu secondary compact size="mini">
              <Menu.Item>
                <Button color="green" onClick={this.handleComparisonClose.bind(this)}>
                  <Icon name="checkmark" /> Done
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button
                  basic
                  data-clipboard-text={JSON.stringify(this.state.rawDiffData, null, 4)}
                  className="clipBoard"
                  onClick={this.onCopy.bind(this)}
                >
                  <Icon name="copy" /> {this.state.copyText}
                </Button>
              </Menu.Item>
            </Menu>
          </Segment>
        </div>
      </div>
    );
  }
}
