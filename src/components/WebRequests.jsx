// @flow

import React from 'react';
import { Accordion } from 'semantic-ui-react';
import Title from './Title.jsx';
import Detail from './Detail.jsx';
import type { WebRequestPayload } from '../types.js';
import { map, flatten, defaultTo, path } from 'ramda';

type Props = {
    data: Array<WebRequestPayload>
};

const panelRows = (data: Array<WebRequestPayload>): Array<any> => {
    const panelRows = map(
        (payload) => {
            let requestData = payload.data;
            // $FlowFixMe
            let title: string = defaultTo(payload.providerDisplayName, path(['data', 'meta', 'title'], payload));
            let titleElem = <Title title={title} logo={payload.providerLogo} timeStamp={payload.timeStamp} />;
            let contentElem = <Detail data={requestData.params} />;
            let titleNode = (
                <Accordion.Title>
                    {titleElem}
                </Accordion.Title>
            );
            let contentNode = (
                <Accordion.Content>
                    {contentElem}
                </Accordion.Content>
            );

            return [titleNode, contentNode];
        },
        data
    );
    return flatten(panelRows);
};

export default class WebRequests extends React.Component<Props> {
    constructor(props: any){
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
