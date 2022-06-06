const validateVendor = vendor => {
    if (!vendor.profile_id || !vendor.garageSaleEvent_id || !vendor.description || !vendor.address) {
        throw new Error('VALIDATION ERROR: vendor requires a profile_id, garageSaleEvent_id, description, and address.');
    }
};

export default (state = [], action) => {
    let { type, payload } = action;

    switch (type) {
        case 'VENDORS_FETCH':
            return payload;
        case 'VENDOR_CREATE':
            validateVendor(payload);
            return [payload, ...state];
        case 'VENDOR_DELETE':
            if (state === []) throw new Error('USAGE ERROR: can not delete vendor not in state');
            validateVendor(payload);
            return state.filter(vendor => vendor.id !== payload.id);
        case 'SIGN_OUT':
            return [];
        default:
            return state;
    }
};