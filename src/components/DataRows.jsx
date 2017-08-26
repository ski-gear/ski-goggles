// @flow

import React from 'react';
import { Accordion } from 'semantic-ui-react';
import { path } from 'ramda';
import Title from './Title.jsx';
import Detail from './Detail.jsx';
import type { WebRequestEnvelope } from '../types.js';
import crypto from 'crypto';

type Props = {
};

type State = {
  rows: Array<{title: Title, content: Detail, timeStamp: number}>
};

export default class DataRows extends React.Component<Props, State> {
    componentDidMount(){
    // $FlowFixMe
        document.addEventListener('newData', (data: WebRequestEnvelope) => {
            // $FlowFixMe
            this.appendRow(data.detail);
        });
    }

    constructor(props: Props) {
        super(props);
        this.state = { rows: [] };
        // $FlowFixMe
        this.appendRow = this.appendRow.bind(this);
    }

    render() {
        return (
            <div>
                <Accordion panels={ this.state.rows } styled fluid>
                </Accordion>
            </div>
        );
    }

    appendRow(data: WebRequestEnvelope) {
        if(path(['type'], data) !== 'webRequest'){
            return;
        }

        let payload = data.payload;
        let requestData = data.payload.data;
        // let url = payload.url;
        let title = <Title name={payload.providerDisplayName}  logo={payload.providerLogo} timeStamp={payload.timeStamp} />;
        let content = <Detail data={requestData} />;
        let key = generateRandomId();
        let row = { title: title, content: content, key: key };

        let nextState = this.state;
        // $FlowFixMe
        nextState.rows.push(row);

        this.setState(nextState);
    }
}

const generateRandomId = (): string => {
    const id = crypto.randomBytes(16).toString('hex');
    return id;
};
