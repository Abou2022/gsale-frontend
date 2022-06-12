import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Footer(props) {
  let profileLink =
    props.userProfile && props.userProfile.id
      ? `/profile2/${props.userProfile.id}`
      : '';
  return (
    <div>
      <Link to={profileLink}>Profile</Link>
      <div>
        <Link to="/create">Create</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  // userAuth: state.userAuth,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, null)(Footer);
