export default (state=null, action) => {
    let { type, payload } = action;
  
    switch(type) {
      case 'SIGN_IN':
        return payload;
      case 'SIGN_OUT':
        return null;
      default:
        return state;
    }
  };