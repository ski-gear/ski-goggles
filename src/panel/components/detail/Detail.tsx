import * as moment from "moment";
import { assoc, defaultTo, groupBy, keys, map, prop, sortBy } from "ramda";
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Container, Header, Table } from "semantic-ui-react";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import { FormattedDataItem } from "ski-vendors";

import { WebRequestPayload, WebRequestPayloadSnapshot } from "../../../types/Types";
import JsonMenu from "../JsonMenu";
import DetailMenu from "./Menu";

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
  payload: WebRequestPayload;
  addSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
  removeSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
}

interface GroupedData {
  [key: string]: FormattedDataItem[];
}

const renderRows = (rows: FormattedDataItem[]) => {
  return map(row => {
    return (
      <Table.Row key={row.label}>
        <Table.Cell>{row.label}</Table.Cell>
        <Table.Cell>{format(row.formatting, row.value)}</Table.Cell>
      </Table.Row>
    );
  }, rows);
};

const format = (valueType: string, value: string): JSX.Element => {
  if (valueType === "json") {
    return (
      <Container fluid>
        <JsonMenu value={value} />
        <SyntaxHighlighter language="json" showLineNumbers>{value}</SyntaxHighlighter>
      </Container>
    );
  } else {
    return <div>{value}</div>;
  }
};

const groupedCategories = (rows: FormattedDataItem[]): GroupedData => {
  return groupBy(row => defaultTo("General Data", row.category) as string, rows);
};

const wrappedTable = (data: GroupedData): JSX.Element[] => {
  const categories = sortBy(_ => _, keys(data));

  return map(category => {
    return (
      <div key={category}>
        <Header as="h4">{category}</Header>
        <Table celled>
          <Table.Body>{renderRows(prop(category, data))}</Table.Body>
        </Table>
        <br />
      </div>
    );
  }, categories);
};

const addMetaData = (data: GroupedData, payload: WebRequestPayload): GroupedData => {
  const metaData = [
    {
      category: "metaData",
      formatting: "string",
      label: "Intercepted Time",
      value: formatTime(payload.timeStamp),
    },
    {
      category: "metaData",
      formatting: "string",
      label: "Intercepted URL",
      value: payload.url,
    },
  ];

  return assoc("Meta Data", metaData, data);
};

const formatTime = (timeStamp: number): string => {
  return moment(timeStamp).format("MMMM Do YYYY HH:mm:ss:SSS");
};

export const Detail = (props: Props) => {
  const categorized = groupedCategories(props.payload.data.data);
  const groupedWithMetaData = addMetaData(categorized, props.payload);

  return (
    <div>
      <DetailMenu
        payload={props.payload}
        addSnapshot={props.addSnapshot}
        snapshots={props.snapshots}
        removeSnapshot={props.removeSnapshot}
      />
      <Divider />
      {wrappedTable(groupedWithMetaData)}
    </div>
  );
};
