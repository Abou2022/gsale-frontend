import { checkAndAdd } from '../lib/util.js';

const validateGarageSaleEvent = garageSaleEvent => {
    if (!garageSaleEvent.eventName || !garageSaleEvent.startTime || !garageSaleEvent.endTime || !garageSaleEvent.startDate || !garageSaleEvent.endDate || !garageSaleEvent.description) {
        throw new Error('VALIDATION ERROR: garageSaleEvent requires a eventName, startTime, endTime, startDate, endDate and description.');
    }
};

export default (state = [], action) => {
    let { type, payload } = action;

    switch (type) {
        case 'GARAGE_SALE_EVENT_FETCH':
            return checkAndAdd(payload, state);
        case 'GARAGE_SALE_EVENTS_FETCH':
            return [...payload, ...state];
        case 'GARAGE_SALE_EVENT_CREATE':
            validateGarageSaleEvent(payload);
            return [payload, ...state];
        case 'GARAGE_SALE_EVENT_UPDATE':
            if (state === []) throw new Error('USAGE ERROR: can not update garageSaleEvent not in state');
            validateGarageSaleEvent(payload);
            return state.map(garageSaleEvent => garageSaleEvent.id === payload.id ? payload : garageSaleEvent);
        case 'GARAGE_SALE_EVENT_DELETE':
            if (state === []) throw new Error('USAGE ERROR: can not delete garageSaleEvent not in state');
            validateGarageSaleEvent(payload);
            return state.filter(garageSaleEvent => garageSaleEvent.id !== payload.id);
        case 'GARAGE_SALE_EVENT_JOIN':
            return [payload, ...state];
        case 'SIGN_OUT':
            return [];
        default:
            return state;
    }
};