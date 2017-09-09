// @flow

import React from 'react';
import { connect } from 'react-redux';
import { addWebRequestRowAction } from '../../actions.js';

type Props = {
    dispatch: any
};

type State = {};

class AddWebRequest extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let dispatch = this.props.dispatch;

        document.addEventListener('newData', (data: any) => {
            if(data.detail.type == 'webRequest'){
                dispatch(addWebRequestRowAction(data.detail.payload));
            }
        });
    }

    render(){
        return null;
    }
}

export default connect()(AddWebRequest);

