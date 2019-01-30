import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            auth.isAuthenticated
            ? <Component {...rest} />
            : <Redirect to={rest.path == '/' ? '/auth' : `/auth?next=${rest.path}`} />
        )}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
})

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ProtectedRoute);