const validateAttendee = attendee => {
  if (!attendee.profile_id || !attendee.garageSaleEvent_id) {
    throw new Error(
      'VALIDATION ERROR: attendee requires a profile_id, and garageSaleEvent_id.'
    );
  }
};

let attendees = (state = [], action) => {
  let { type, payload } = action;

  switch (type) {
    case 'ATTENDEES_FETCH':
      return payload;
    case 'ATTENDEE_CREATE':
      validateAttendee(payload);
      return [payload, ...state];
    case 'ATTENDEE_DELETE':
      if (state === [])
        throw new Error('USAGE ERROR: can not delete attendee not in state');
      validateAttendee(payload);
      return state.filter(attendee => attendee.id !== payload.id);
    case 'SIGN_OUT':
      return [];
    default:
      return state;
  }
};

export default attendees;
