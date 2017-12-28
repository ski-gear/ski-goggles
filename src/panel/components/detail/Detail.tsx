import * as React from "react";
import { Table, Header, Container, Icon, Menu, Transition } from "semantic-ui-react";
import * as Highlight from "react-highlight";
import { groupBy, defaultTo, map, keys, prop, sortBy } from "ramda";
import { WebRequestParam, Provider } from "ski-providers";
import JsonMenu from '../JsonMenu';
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import { WebRequestPayload, WebRequestPayloadSnapshot } from "../../../types/Types";
import DetailMenu from "./Menu";

type Props = {
  payload: WebRequestPayload;
  addSnapshot: (wrps: WebRequestPayloadSnapshot) => void;
};

const renderRows = (rows: WebRequestParam[]) => {
  return map(row => {
    return (
      <Table.Row key={row.label}>
        <Table.Cell>{row.label}</Table.Cell>
        <Table.Cell>{format(row.valueType, row.value)}</Table.Cell>
      </Table.Row>
    );
  }, rows);
};

const format = (valueType: string, value: string): JSX.Element => {
  if (valueType == "json") {
    return (
      <Container fluid>
        <JsonMenu value={value} />
        <Highlight className="json">{value}</Highlight>
      </Container>
    );
  } else {
    return <div>{value}</div>;
  }
};

const groupedCategories = (rows: WebRequestParam[]): { [key: string]: WebRequestParam[] } => {
  return groupBy(
    row => defaultTo("General Data", row.category) as string,
    rows,
  );
};


const wrappedTable = (data: { [category: string]: WebRequestParam[] }): JSX.Element[] => {
  const categories = sortBy(_ => _, keys(data));

  return map(category => {
    return (
      <div key={category}>
        <Header as="h4">{category}</Header>
        <Table celled>
          <Table.Body>
            { renderRows(prop(category, data)) }
          </Table.Body>
        </Table>
        <br />
      </div>
    );
  }, categories);
};

export const Detail = (props: Props) => {
    const grouped = groupedCategories(props.payload.data.params);
    return <div>
      <DetailMenu payload={props.payload} addSnapshot={props.addSnapshot}/>
      <Divider />
      {wrappedTable(grouped)}
    </div>;
}
