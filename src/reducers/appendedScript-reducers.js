let appendedScript = (state = false, action) => {
  let { type } = action;

  switch (type) {
    case 'APPENDED_SCRIPT':
      return true;
    default:
      return state;
  }
};

export default appendedScript;
