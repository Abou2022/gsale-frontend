import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userAuth-actions.js';
import Map from '../map';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.userAuth);
    };
    handleSignOut = () => {
        this.props.signOut();
        this.props.history.push('/');
    };
    render() {
        return (
            <div className="">
                <p>Home</p>
                <Map />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userAuth: state.userAuth,
    userProfile: state.userProfile,
    attendees: state.attendess,
    comments: state.comments,
    garageSaleEvent: state.garageSaleEvent,
    vendors: state.vendors
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);