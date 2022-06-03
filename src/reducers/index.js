import { combineReducers } from 'redux';
import userAuth from './userAuth-reducers';
import userProfile from './userProfile-reducers';
import buyers from './buyer-reducers';
import comments from './comment-reducers';
import garageSaleEvents from './garageSaleEvent-reducers';
import sellers from './seller-reducers';

export default combineReducers({
  userAuth,
  userProfile,
  buyers,
  comments,
  garageSaleEvents,
  sellers,
});