import { combineReducers } from 'redux';
import userAuth from './userAuth-reducers';
import userProfile from './userProfile-reducers';
import attendees from './attendees-reducers';
import comments from './comments-reducers';
import garageSaleEvent from './garageSaleEvent-reducers';
import currentGarageSaleEvent from './currentGarageSaleEvent-reducers';
import unfilteredGarageSaleEvent from './unfilteredGarageSaleEvent-reducers';
import vendors from './vendors-reducers';
import currentVendor from './currentVendor-reducers';
import searchCriteria from './searchCriteria-reducers';
import appendedScript from './appendedScript-reducers';
import userLocation from './userLocation-reducers';

export default combineReducers({
  userAuth,
  userProfile,
  attendees,
  comments,
  garageSaleEvent,
  currentGarageSaleEvent,
  unfilteredGarageSaleEvent,
  vendors,
  searchCriteria,
  appendedScript,
  userLocation,
  currentVendor,
});
