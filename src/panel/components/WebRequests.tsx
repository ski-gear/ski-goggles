import { defaultTo, map, path } from "ramda";
import * as React from "react";
import { Provider } from "react-redux";
import { Accordion } from "semantic-ui-react";
import {
  WebRequestPayload,
  WebRequestPayloadSnapshot,
} from "../../types/Types";
import { Detail } from "./detail/Detail";
import Title from "./Title";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  snapshots: WebRequestPayloadSnapshot[];
  data: WebRequestPayload[];
  chromeId: string;
  addSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot) => void;
  removeSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot) => void;
}

const panelRows = (
  data: WebRequestPayload[],
  addSnapshot: any,
  removeSnapshot: any,
  snapshots: WebRequestPayloadSnapshot[]
): any[] => {
  const panelRows = map((payload) => {
    const provider = payload.provider;
    const title = defaultTo(
      provider.displayName,
      path(["meta", "title"], payload.data)
    ) as string;
    const titleElem = (
      <Title
        title={title}
        payload={payload}
        provider={provider.displayName}
        logo={provider.logo}
        timeStamp={payload.timeStamp}
        key={ {title} + uuidv4() }
      />
    );
    const contentElem = (
      <Detail
        payload={payload}
        addSnapshot={addSnapshot}
        removeSnapshot={removeSnapshot}
        snapshots={snapshots}
      />
    );
    const titleNode = (
      <Accordion.Title key={"title-" + uuidv4() }>
        {titleElem}
      </Accordion.Title>
    );
    const contentNode = (
      <Accordion.Content key={"content-" + uuidv4() }>
        {contentElem}
      </Accordion.Content>
    );
    return {
      title: titleNode,
      content: {
        content: contentElem,
        key: "content-" + uuidv4(),
      },
    };
  }, data);
  return panelRows;
};

export default class WebRequests extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public addSnapshot(wrps: WebRequestPayloadSnapshot) {
    return this.props.addSnapshot(this.props.chromeId, wrps);
  }

  public removeSnapshot(wrps: WebRequestPayloadSnapshot) {
    return this.props.removeSnapshot(this.props.chromeId, wrps);
  }

  public render() {
    return (
      <div>
        <Accordion
          styled
          fluid
          panels={panelRows(
            this.props.data,
            this.addSnapshot.bind(this),
            this.removeSnapshot.bind(this),
            this.props.snapshots
          )}
        />
      </div>
    );
  }
}