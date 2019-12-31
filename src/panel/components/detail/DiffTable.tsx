import * as React from "react";

interface Props {
  formattedDiff: string;
}

interface State {}

export default class DiffTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return <p>{this.props.formattedDiff}</p>;
  }
}
