import * as React from "react";
import { Table, Header, Container, Icon, Menu, Transition } from "semantic-ui-react";
import { groupBy, defaultTo, map, keys, prop, sortBy } from "ramda";
import { WebRequestParam } from "ski-providers";

interface Props {
  data: WebRequestParam[]
}

export const Payload = (props: Props): JSX.Element => {
  return <div></div>
}
