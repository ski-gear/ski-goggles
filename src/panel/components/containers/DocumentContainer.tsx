import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { NewSnapshotPostMessage, NewWebRequestPostMessage } from "../../../Constants";
import { WebRequestMessageEnvelope, WebRequestPayloadSnapshot } from "../../../types/Types";
import { AddChromeId } from "../../actions/MetaData";
import { SyncSnapshots } from "../../actions/Snapshots";
import { addWebRequestRowAction } from "../../actions/WebRequests";

interface PostedData {
  detail: WebRequestMessageEnvelope;
}

interface Props {
  dispatch: Dispatch<any>;
}

interface State {}

class DocumentContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    const dispatch = this.props.dispatch;

    document.addEventListener(NewWebRequestPostMessage, (data: any) => {
      const postedData = data as PostedData;
      if (postedData.detail.type == "webRequest") {
        dispatch(addWebRequestRowAction(postedData.detail.payload));
      }
    });

    document.addEventListener("chromeId", (data: any) => {
      const chromeId: string = data.detail.chromeId;
      dispatch(AddChromeId(chromeId));
    });

    document.addEventListener(NewSnapshotPostMessage, (data: any) => {
      const wrpss = data.detail.payload as WebRequestPayloadSnapshot[];
      dispatch(SyncSnapshots(wrpss));
    });
  }

  public render() {
    return null;
  }
}

export default connect()(DocumentContainer);
