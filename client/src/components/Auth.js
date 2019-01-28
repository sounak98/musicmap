import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout'
import './Login.css';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            activeForm: "login",
        };
        this.activeFormToggler = this.activeFormToggler.bind(this);
    }

    componentWillMount() {
        const redirect = this.props.match.url.substring(6);
        if (redirect) {
            console.log(redirect);
            this.setState({ redirect });
        }
    }

    activeFormToggler() {
        if (this.state.activeForm == "login") {
            this.setState({ activeForm: "signup" });
        }
        else if (this.state.activeForm == "signup") {
            this.setState({ activeForm: "login" });
        }
    }

    render() {
        if (this.props.auth.isAuthenticated) {
            if (this.state.redirect) {
                return (<Redirect to={`/${this.state.redirect}`} />);
            }
            else {
                return (<Redirect to="/" />);
            }
        }

        if (this.state.activeForm == "login") {
            return (<Login toggler={this.activeFormToggler} />);
        }
        else if (this.state.activeForm == "signup") {
            return (<Signup toggler={this.activeFormToggler} />);
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

Auth.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Auth);