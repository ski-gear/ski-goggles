// @flow

import React from 'react';
import { Image, Statistic } from 'semantic-ui-react';
import { map } from 'ramda';
import type { ProviderStat } from '../types.js';

type Props = {
  providerStats: Array<ProviderStat>
};

const renderStatistic = (data: ProviderStat) => {
    return(
        <Statistic size='small'>
            <Statistic.Value>
                <Image src={'images/providers/' + data.logo} inline shape='circular' />
                <span>{data.value}</span>
            </Statistic.Value>
        </Statistic>
    );
};

const renderTotal = (value: number) => {
    return(
        <Statistic size='small' color='red'>
            <Statistic.Value>
                <Image src='images/ski-goggles-48.png' inline shape='circular' />
                <span>{value}</span>
            </Statistic.Value>
        </Statistic>
    );
};

export default class MenuBar extends React.Component<Props> {
    render(){
        return(
            <div className="ui two collumn centered grid">
                <div className="column">
                    <Statistic.Group widths="three">
                        { renderTotal(20) }
                        {
                            map(renderStatistic, this.props.providerStats)
                        }
                    </Statistic.Group>
                </div>
            </div>
        );
    }
}
