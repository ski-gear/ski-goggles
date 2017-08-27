// @flow

import type { WebRequestPayload } from '../types.js';

import { combineReducers } from 'redux';
import { ADD_WEB_REQUEST_ROW, CLEAR_ALL_WEB_REQUESTS } from './actions';
import type { Action } from './actions';

type State = Array<WebRequestPayload>;

const webRequests = (state : State = [] , action: Action ): State => {
    switch (action.type) {
    case ADD_WEB_REQUEST_ROW:
        return [
            ...state,
            action.webRequest
        ];
    default:
        return state;
    }
};

const clearAll = (state : State = [] , action: Action): State => {
    switch (action.type) {
    case CLEAR_ALL_WEB_REQUESTS:
        return [];
    default:
        return state;
    }
};

const skiGoggles = combineReducers({
    clearAll,
    webRequests
});

export default skiGoggles;