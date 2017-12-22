import * as React from "react";
import { connect } from "react-redux";
import { addWebRequestRowAction } from "../../Actions";

type Props = {
  dispatch: any;
};

type State = {};

class AddWebRequest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    let dispatch = this.props.dispatch;

    document.addEventListener("newData", (data: any) => {
      if (data.detail.type == "webRequest") {
        dispatch(addWebRequestRowAction(data.detail.payload));
      }
    });
  }

  render() {
    return null;
  }
}

export default connect()(AddWebRequest);
