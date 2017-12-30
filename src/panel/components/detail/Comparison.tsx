import * as React from "react";
import {
  Button,
  Icon,
  Menu,
  Modal,
  Header,
  Form,
  Table,
  Divider,
  Popup,
  Segment,
  Image,
  Label,
} from "semantic-ui-react";
import { map, reverse, filter, find, defaultTo, props, propOr, reduce, assoc } from "ramda";
import { WebRequestPayloadSnapshot, WebRequestPayload } from "./../../../types/Types";
import { ProviderCanonicalName } from "ski-providers";
import { WebRequestParam } from "ski-providers";
import { generateDiff, generateImageUrl } from "./../../Helpers";
import * as moment from "moment";

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
  currentPayload: WebRequestPayload;
  removeSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface State {
  diffTableShown: boolean;
  diffDataShown: boolean;
  formattedDiffData: string;
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
    this.state = { diffDataShown: false, diffTableShown: true, formattedDiffData: "" };
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

      this.setState({ diffDataShown: true, diffTableShown: false, formattedDiffData });
    };
  };

  handleRemove = (wrps: WebRequestPayloadSnapshot): Function => {
    return (): void => {
      this.props.removeSnapshot(wrps);
    };
  };

  options = (): JSX.Element[] => {
    const snapshots = this.props.snapshots;
    const currentProviderName = this.props.currentPayload.provider.canonicalName;
    const filtered = filter(
      (s: WebRequestPayloadSnapshot) => s.provider.canonicalName === currentProviderName,
      snapshots,
    );

    const values = map((s: WebRequestPayloadSnapshot) => {
      const eventTitle = propOr("Unknown Event", "title", s.data.meta) as string;
      const time = moment(s.snapshotTimeStamp).fromNow();
      return (
        <Table.Row key={s.browserRequestId}>
          <Table.Cell>
            <Label basic image>
              <Image avatar src={generateImageUrl(s.provider.logo)} />
              {eventTitle}
              <Label.Detail>{s.title}</Label.Detail>
            </Label>
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

  render() {
    return (
      <div>
        <div className={hiddenClass(this.state.diffTableShown)}>
          <Header size="small">
            <Icon name="window restore" />
            Compare the current event with a saved Snapshot
          </Header>
          {this.props.snapshots.length > 0 ? this.table.bind(this)() : this.noRows.bind(this)()}
        </div>
        <div className={hiddenClass(this.state.diffDataShown)}>
          <Segment stacked className="diff-result">
            <Header size="tiny">
              <Icon name="file text outline" />
              Comparison Report
            </Header>
            <div dangerouslySetInnerHTML={{ __html: this.state.formattedDiffData }} />
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
