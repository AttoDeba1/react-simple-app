import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default class Root extends Component {
    render() {
        const { store , history} =this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={} routes={} />
                </div>
            </Provider>
        );
    }
}

Root.propTypes={
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};