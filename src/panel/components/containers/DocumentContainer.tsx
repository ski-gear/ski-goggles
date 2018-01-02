import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { addWebRequestRowAction, AddWebRequestRowAction } from "../../actions/WebRequests";
import { WebRequestMessageEnvelope, WebRequestPayloadSnapshot } from "../../../types/Types";
import { NewWebRequestPostMessage, NewSnapshotPostMessage } from "../../../Constants";
import { AddChromeId } from '../../actions/MetaData'
import { SyncSnapshots } from "../../actions/Snapshots";

type PostedData = {
  detail: WebRequestMessageEnvelope
};

type Props = {
  dispatch: Dispatch<any>;
};

type State = {};

class DocumentContainer extends React.Component<Props, State> {
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

    document.addEventListener("chromeId", (data: any) => {
     const chromeId: string = data.detail.chromeId;
     dispatch(AddChromeId(chromeId));
    });

    document.addEventListener(NewSnapshotPostMessage, (data: any) => {
      const wrpss = data.detail.payload as WebRequestPayloadSnapshot[]
      dispatch(SyncSnapshots(wrpss));
    });
  }

  render() {
    return null;
  }
}

export default connect()(DocumentContainer);
