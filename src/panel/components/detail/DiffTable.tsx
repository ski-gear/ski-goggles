import * as React from "react";

interface Props {
  formattedDiff: string;
}

interface State {}

export default class DiffTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <p>{this.props.formattedDiff}</p>;
  }
}
