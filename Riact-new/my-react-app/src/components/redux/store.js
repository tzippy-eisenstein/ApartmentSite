// store.js

import { combineReducers, createStore } from 'redux';

// Define initial state
const initialState = {
    currentClient: { _id: 0, email: '', password: '' },
    currentAdvertiser: { _id: 0, firstName: '', lastName: '', email: '', password: '' }
};

// Define reducers
const clientReducer = (state = initialState.currentClient, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CLIENT':
            return action.payload;
        default:
            return state;
    }
};

const advertiserReducer = (state = initialState.currentAdvertiser, action) => {
    switch (action.type) {
        case 'SET_CURRENT_ADVERTISER':
            return action.payload;
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    currentClient: clientReducer,
    currentAdvertiser: advertiserReducer
});

// Create store
const store = createStore(rootReducer);

export default store;
