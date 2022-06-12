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
      <div>
        <Link to={profileLink}>Profile</Link>
      </div>
      <div>
        <Link to="/create">Create GSE</Link>
      </div>
      <div>
        <Link to="/gsale/5/addvendor">Create Vendor</Link>
      </div>
      <div>
        <Link to="/gsale/5/updatevendor/6">Update Vendor</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  // userAuth: state.userAuth,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, null)(Footer);
