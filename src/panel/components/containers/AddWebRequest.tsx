import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { addWebRequestRowAction, AddWebRequestRowAction } from "../../actions/index";
import { WebRequestMessageEnvelope } from "../../../types/Types";
import { NewWebRequestPostMessage } from "../../../Constants";

type PostedData = {
  detail: WebRequestMessageEnvelope
};

type Props = {
  dispatch: Dispatch<any>;
};

type State = {};

class AddWebRequest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    let dispatch = this.props.dispatch;

    document.addEventListener(NewWebRequestPostMessage, (data: any) => {
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
