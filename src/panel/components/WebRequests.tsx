import * as React from "react";
import { Accordion } from "semantic-ui-react";
import Title from "./Title";
import Detail from "./Detail";
import { WebRequestPayload } from "../../types/Types";
import { map, flatten, defaultTo, path } from "ramda";

type Props = {
  data: WebRequestPayload[];
};

const panelRows = (data: WebRequestPayload[]): any[] => {
  const panelRows = map(payload => {
    let requestData = payload.data;
    let provider = payload.provider;
    let title = defaultTo(provider.displayName, path(["meta", "title"], payload.data)) as string;
    let titleElem = <Title title={title} logo={provider.logo} timeStamp={payload.timeStamp} />;
    let contentElem = <Detail data={requestData.params} provider={provider}/>;
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
          {panelRows(this.props.data)}
        </Accordion>
      </div>
    );
  }
}
