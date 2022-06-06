import superagent from 'superagent';

// to do: cases 'ADD_VENDOR' and 'ADD_ATTENDEE' in reducer are not accounted for

export const userProfileCreate = userProfile => ({
    type: 'USERPROFILE_CREATE',
    payload: userProfile,
});

export const userProfileUpdate = userProfile => ({
    type: 'USERPROFILE_UPDATE',
    payload: userProfile,
});

export const userProfileFetch = userProfile => ({
    type: 'USERPROFILE_FETCH',
    payload: userProfile,
});

export const userProfileCreateRequest = userProfile => (dispatch, getState) => {
    const { userAuth } = getState();
    return superagent.post(`${process.env.API_URL}/api/profiles`)
        .set('Authorization', `Bearer ${userAuth}`)
        .field({ username: userProfile.username, image: userProfile.image, country: userProfile.country, state: userProfile.state, birthdate: userProfile.birthdate, tags: userProfile.tags })
        .then(res => {
            dispatch(userProfileCreate(res.body));
            return res;
        });
};

export const userProfileUpdateRequest = profile => (dispatch, getState) => {
    const { userAuth, userProfile } = getState();
    return superagent.put(`${process.env.API_URL}/api/profiles/${userProfile.id}`)
        .set('Authorization', `Bearer ${userAuth}`)
        .send(profile)
        .then(res => {
            dispatch(userProfileUpdate(res.body));
            return res;
        });
};

export const userProfileFetchRequest = () => (dispatch, getState) => {
    const { userAuth, userProfile } = getState();
    return superagent.get(`${process.env.API_URL}/api/profiles/${userProfile.id}`)
        .set('Authorization', `Bearer ${userAuth}`)
        .then(res => {
            dispatch(userProfileFetch(res.body));
            return res;
        });
    // to do work on this
    // const { userAuth } = getState();
    // return superagent.get(`${process.env.API_URL}/api/profiles/currentuser`)
    //     .set('Authorization', `Bearer ${userAuth}`)
    //     .then(res => {
    //         dispatch(userProfileFetch(res.body));
    //         return res;
    //     });
};