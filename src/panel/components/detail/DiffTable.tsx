import * as React from "react";
import { Table, Button, Icon, Menu, Modal, Header, Form, Dropdown } from "semantic-ui-react";
import { map, reverse, filter } from "ramda";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import { ProviderCanonicalName } from "ski-providers";
import { WebRequestParam } from "ski-providers";

interface Props {
  formattedDiff: string;
}

interface State {}

export default class DiffTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <p>
        {this.props.formattedDiff}
      </p>
    );
  }
}
