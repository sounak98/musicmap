import React, { Component } from 'react';
import Auth from '../api/auth';
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';

const auth = new Auth();

class Logout extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        auth.logout();
        this.props.logoutUser();
    }

    render() {
        return (<Redirect to="/auth" />);
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

Logout.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logoutUser })(Logout);