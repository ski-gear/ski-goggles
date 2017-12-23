import * as React from "react";
import { connect } from "react-redux";
import { addWebRequestRowAction } from "../../Actions";
import { WebRequestEnvelope } from "../../../types/Types";

type PostedData = {
  detail: WebRequestEnvelope
};

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
      const postedData = data as PostedData
      if (postedData.detail.type == "webRequest") {
        dispatch(addWebRequestRowAction(postedData.detail.payload));
      }
    });
  }

  render() {
    return null;
  }
}

export default connect()(AddWebRequest);
