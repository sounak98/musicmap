import React, { Component } from 'react';
import Auth from '../api/auth';
import { loginUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Login.css';

const auth = new Auth();

class Login extends Component {
    constructor() {
        super();
        this.state = {
            validationError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    async loginUser(username, password) {
        const { err, user } = await auth.login(username, password);
        if (!err) {
            console.log(user.user);
            // how to implement .then() to this.props.loginUser?
            this.props.loginUser(user.user);
        }
        else {
            this.setState({ validationError: err });
            console.log(err);
        }
    }

    render() {
        const validated = (
            this.state.username &&      // username is entered
            this.state.password         // password is entered
        );

        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        {this.state.validationError && <div className="form-item-footer failure">{this.state.validationError}</div>}
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <div className="form-item-footer"><a href="" onClick={
                            (e) => {e.preventDefault(); this.props.toggler();}
                        }>Not registered? Signup</a></div>
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                            disabled={!validated}
                            onClick={async (e) => {e.preventDefault(); await this.loginUser(this.state.username, this.state.password);}}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loginUser })(Login);