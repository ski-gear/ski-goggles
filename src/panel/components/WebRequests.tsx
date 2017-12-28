import * as React from "react";
import { Accordion } from "semantic-ui-react";
import Title from "./Title";
import { Detail } from "./detail/Detail";
import { WebRequestPayload } from "../../types/Types";
import { map, flatten, defaultTo, path } from "ramda";

type Props = {
  data: WebRequestPayload[],
  addSnapshot: (wrd: WebRequestPayload) => void
};

const panelRows = (data: WebRequestPayload[], addSnapshot: any): any[] => {
  const panelRows = map(payload => {
    let requestData = payload.data;
    let provider = payload.provider;
    let title = defaultTo(provider.displayName, path(["meta", "title"], payload.data)) as string;
    let titleElem = <Title title={title} logo={provider.logo} timeStamp={payload.timeStamp} />;
    let contentElem = <Detail payload={payload} addSnapshot={addSnapshot}/>;
    let titleNode = <Accordion.Title>{titleElem}</Accordion.Title>;
    let contentNode = <Accordion.Content>{contentElem}</Accordion.Content>;

    return [titleNode, contentNode];
  }, data);
  return flatten(panelRows);
};

export default class WebRequests extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Accordion styled fluid>
          {panelRows(this.props.data, this.props.addSnapshot)}
        </Accordion>
      </div>
    );
  }
}
