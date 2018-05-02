import { defaultTo, flatten, map, path } from "ramda";
import * as React from "react";
import { Accordion } from "semantic-ui-react";

import { WebRequestPayload, WebRequestPayloadSnapshot } from "../../types/Types";
import { Detail } from "./detail/Detail";
import Title from "./Title";

type Props = {
  snapshots: WebRequestPayloadSnapshot[];
  data: WebRequestPayload[];
  chromeId: string;
  addSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot) => void;
  removeSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot) => void;
};

const panelRows = (
  data: WebRequestPayload[],
  addSnapshot: any,
  removeSnapshot: any,
  snapshots: WebRequestPayloadSnapshot[],
): any[] => {
  const panelRows = map(payload => {
    let requestData = payload.data;
    let provider = payload.provider;
    let title = defaultTo(provider.displayName, path(["meta", "title"], payload.data)) as string;
    let titleElem = <Title title={title} logo={provider.logo} timeStamp={payload.timeStamp} />;
    let contentElem = (
      <Detail payload={payload} addSnapshot={addSnapshot} removeSnapshot={removeSnapshot} snapshots={snapshots} />
    );
    let titleNode = <Accordion.Title key={"title-"+ payload.timeStamp}>{titleElem}</Accordion.Title>;
    let contentNode = <Accordion.Content key={"content-" + payload.timeStamp}>{contentElem}</Accordion.Content>;

    return [titleNode, contentNode];
  }, data);
  return flatten(panelRows);
};

export default class WebRequests extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  addSnapshot(wrps: WebRequestPayloadSnapshot) {
    return this.props.addSnapshot(this.props.chromeId, wrps);
  }

  removeSnapshot(wrps: WebRequestPayloadSnapshot) {
    return this.props.removeSnapshot(this.props.chromeId, wrps);
  }

  render() {
    return (
      <div>
        <Accordion styled fluid>
          {panelRows(
            this.props.data,
            this.addSnapshot.bind(this),
            this.removeSnapshot.bind(this),
            this.props.snapshots,
          )}
        </Accordion>
      </div>
    );
  }
}
