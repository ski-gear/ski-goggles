// @flow

import React from 'react';
import { Accordion } from 'semantic-ui-react';
import Title from './Title.jsx';
import Detail from './Detail.jsx';
import type { WebRequestPayload } from '../types.js';
import { map } from 'ramda';
import crypto from 'crypto';

type PanelRowData = { title: React$Element<*>, content: React$Element<*>, key: string };
type Props = {
    data: Array<WebRequestPayload>
};

const panelRows = (data: Array<WebRequestPayload>): Array<PanelRowData> => {
    const panelRows = map(
        (payload) => {
            let requestData = payload.data;
            let title = <Title name={payload.providerDisplayName} logo={payload.providerLogo} timeStamp={payload.timeStamp} />;
            let content = <Detail data={requestData} />;
            let key = generateRandomId();
            return { title: title, content: content, key: key };
        },
        data
    );

    return panelRows;
};

const generateRandomId = (): string => {
    const id = crypto.randomBytes(16).toString('hex');
    return id;
};

export default class WebRequests extends React.Component<Props> {
    constructor(props: any){
        super(props);
    }

    render() {
        return (
            <div>
                <Accordion panels={ panelRows(this.props.data) } styled fluid>
                </Accordion>
            </div>
        );
    }
}
