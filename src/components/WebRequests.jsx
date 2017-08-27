// @flow

import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import Title from './Title.jsx';
import Detail from './Detail.jsx';
import type { WebRequestPayload } from '../types.js';
import { map, flatten } from 'ramda';

type Props = {
    data: Array<WebRequestPayload>
};

const panelRows = (data: Array<WebRequestPayload>): Array<any> => {
    const panelRows = map(
        (payload) => {
            let requestData = payload.data;
            let title = <Title name={payload.providerDisplayName} logo={payload.providerLogo} timeStamp={payload.timeStamp} />;
            let content = <Detail data={requestData} />;
            let titleNode = (
                <Accordion.Title>
                    <Icon name='dropdown' />
                    {title}
                </Accordion.Title>
            );
            let contentNode = (
                <Accordion.Content>
                    {content}
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
