import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import VendorForm from '../vendor-form';
import {
  currentVendorCreateRequest,
  currentVendorUpdateRequest,
  currentVendorFetchRequest,
} from '../../actions/currentVendor-actions';
import { tokenSignInRequest } from '../../actions/userAuth-actions';
import { logError, userValidation } from '../../lib/util.js';

function VendorFormContainer(props) {
  const { garageSaleEventId, vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  let navigate = useNavigate();
  let flag = 0;
  useEffect(() => {
    if (!flag) {
      flag++;
      userValidation(props, navigate);
      if (vendorId) {
        props
          .currentVendorFetch(vendorId)
          .then(vendorData => {
            setVendor(vendorData);
            console.log('vendorData: ', vendorData);
          })
          .catch(err => console.log('currentVendorFetch err: ', err));
      }
    }
  }, []);
  const handleOnComplete = data => {
    console.log('vendorFormContainer: ', data);
    if (vendorId) {
      data.id = vendorId;
      return props.currentVendorUpdate(data).catch(logError);
    } else {
      data.garageSaleEvent_id = garageSaleEventId;
      return props
        .currentVendorCreate(data)
        .then(vendorData =>
          navigate(`/gsale/${garageSaleEventId}/updatevendor/${vendorData.id}`)
        )
        .catch(logError);
    }
  };
  return (
    <div>
      <VendorForm
        onComplete={handleOnComplete}
        vendorData={vendor}
        categoryData={props.category}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
  currentVendor: state.currentVendor,
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  currentVendorCreate: vendorData =>
    dispatch(currentVendorCreateRequest(vendorData)),
  currentVendorUpdate: vendorData =>
    dispatch(currentVendorUpdateRequest(vendorData)),
  currentVendorFetch: vendorDataId =>
    dispatch(currentVendorFetchRequest(vendorDataId)),
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorFormContainer);
