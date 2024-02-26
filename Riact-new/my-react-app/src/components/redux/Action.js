// actions.js

export const setCurrentAdvertiser = (advertiser) => {
    return { type: 'SET_CURRENT_ADVERTISER', payload: advertiser }
}

export const setCurrentClient = (client) => {
    return { type: 'SET_CURRENT_CLIENT', payload: client }
}
