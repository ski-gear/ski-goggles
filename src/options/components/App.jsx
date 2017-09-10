import React from 'react';
import VisibleProviders from './containers/VisibleProviders.jsx';

export default class App extends React.Component {
    componentDidMount() {
        console.log(this.state);
        console.log(this.props);
    }

    render() {
        return (
            <VisibleProviders />
        );
    }
}

