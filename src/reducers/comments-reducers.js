const validateComment = comment => {
    if (!comment.profile_id || !comment.garageSaleEvent_id || !comment.content) {
        throw new Error('VALIDATION ERROR: comment requires a profile id, garagesale event id, and CONTENT.');
    }
};

let comments = (state = [], action) => {
    let { type, payload } = action;

    switch (type) {
        case 'COMMENT_FETCH':
            return [payload];
        case 'COMMENTS_FETCH':
            return payload;
        case 'COMMENT_CREATE':
            validateComment(payload);
            return [...state, payload];
        case 'SIGN_OUT':
            return [];
        default:
            return state;
    }
};

export default comments;