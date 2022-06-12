import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../profile-form';
import {
  userProfileFetchRequest,
  userProfileUpdateRequest,
} from '../../actions/userProfile-actions.js';
import { tokenSignInRequest } from '../../actions/userAuth-actions';
import { logError, renderIf, userValidation } from './../../lib/util.js';

function Profile2(props) {
  let navigate = useNavigate();
  useEffect(() => {
    userValidation(props, navigate);
  }, []);
  const handleProfileUpdate = profile => {
    return props.userProfileUpdate(profile).catch(logError);
  };
  const profileAction = 'update';
  const placeholderImage = require('./../helpers/assets/profilePlaceholder.png');
  let profileImage =
    props.userProfile && props.userProfile.image
      ? props.userProfile.image
      : placeholderImage;
  let email = props.userProfile ? props.userProfile.email : null;

  return (
    <div className="profile-container page-outer-div">
      <div className="grid-container">
        <div>
          <div className="row">
            <div className="col-md-8">
              <div className="createOuter">
                {renderIf(
                  props.userProfile,
                  <div className="page-form">
                    <ProfileForm
                      userProfile={props.userProfile}
                      onComplete={handleProfileUpdate}
                      profileAction={profileAction}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4 hideMedium">
              <div className="mainContainer">
                <div className="mainContainer-header">
                  {renderIf(
                    props.userProfile,
                    <div className="left">
                      <p className="mainContainerHeader">{email}</p>
                    </div>
                  )}
                </div>
                <div className="mainContainerSection">
                  <div className="mainContainerSectionWrapper">
                    <div className="container">
                      <div className="inner-wrapper">
                        <div className="profile-image-div">
                          <img className="profile-image" src={profileImage} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
  tokenSignIn: () => dispatch(tokenSignInRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile2);
