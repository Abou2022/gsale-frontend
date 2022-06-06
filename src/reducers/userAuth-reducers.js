let userAuth = (state = null, action) => {
    let { type, payload } = action;

    switch (type) {
        case 'SIGN_IN':
            return payload.token;
        case 'SIGN_OUT':
            return null;
        default:
            return state;
    }
};

export default userAuth;