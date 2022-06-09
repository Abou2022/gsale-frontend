import { combineReducers } from 'redux';
import userAuth from './userAuth-reducers';
import userProfile from './userProfile-reducers';
import attendees from './attendees-reducers';
import comments from './comments-reducers';
import garageSaleEvent from './garageSaleEvent-reducers';
import vendors from './vendors-reducers';
import searchCriteria from './searchCriteria-reducers';
import appendedScript from './appendedScript-reducers';

export default combineReducers({
  userAuth,
  userProfile,
  attendees,
  comments,
  garageSaleEvent,
  vendors,
  searchCriteria,
  appendedScript,
});
