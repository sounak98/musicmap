import React, { Component } from 'react';
import Auth from '../api/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import './Login.css';

const auth = new Auth();

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            usernameAvailable: null,
            validationError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.signupUser = this.signupUser.bind(this);
        this.checkUsernameAvailability = this.checkUsernameAvailability.bind(this);
    }

    handleChange(e) {
        if (e.target.name == "username") {
            this.setState(
                {
                    [e.target.name]: e.target.value
                }, async () => { await this.checkUsernameAvailability(this.state.username); }
            );
        }
        else {
            this.setState(
                {
                    [e.target.name]: e.target.value
                }
            )
        }
    }

    async signupUser(username, email, password) {
        const err_signup = await auth.signup(username, email, password);
        if (!err_signup) {
            console.log('signup successful');
            const { err_login, user } = await auth.login(username, password);
            if (!err_login) {
                console.log(user.user);
                this.props.loginUser(user.user);
            }
            else {
                console.log(err_login);
            }
        }
        else {
            this.setState({ validationError: "Email exists! Please login." });
            console.log(err_signup);
        }
    }

    async checkUsernameAvailability(username) {
        const { err, res } = await auth.checkUsername(username);
        if (!err) {
            this.setState({ usernameAvailable: res });
        }
        else {
            console.log(err);
        }
    }

    render() {
        const validated = (
            this.state.username &&                              // username is entered
            this.state.usernameAvailable &&                     // entered username is available
            this.state.email &&                                 // email is entered
            this.state.password &&                              // password is entered
            this.state.repeatPassword &&                        // password is repeated
            this.state.password == this.state.repeatPassword    // repeated password is same as the password
        );

        return (
            <div className="center">
                <div className="card">
                    <h1>Signup</h1>
                    <form>
                        {this.state.validationError && <div className="form-item-footer failure">{this.state.validationError}</div>}
                        <input
                            className={this.state.username ? "form-item footer-below" : "form-item"}
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        {this.state.username &&
                            <div
                                className={this.state.usernameAvailable ? "form-item-footer success" : "form-item-footer failure"}
                            >{this.state.usernameAvailable ? "Username available" : "Username taken"}</div>
                        }
                        <input
                            className="form-item"
                            placeholder="Email goes here..."
                            name="email"
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
                        <input
                            className={this.state.repeatPassword ? "form-item footer-below" : "form-item"}
                            placeholder="Repeat your Password..."
                            name="repeatPassword"
                            type="password"
                            onChange={this.handleChange}
                        />
                        {this.state.repeatPassword &&
                            <div
                                className="form-item-footer"
                                className={this.state.password == this.state.repeatPassword ? "form-item-footer success" : "form-item-footer failure"}
                            >{this.state.password == this.state.repeatPassword ? "Passwords match" : "Passwords do not match"}</div>
                        }
                        <div className="form-item-footer"><a href="" onClick={
                            (e) => {e.preventDefault(); this.props.toggler();}
                        }>Already registered? Login</a></div>
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                            disabled={!validated}
                            onClick={async (e) => {e.preventDefault(); await this.signupUser(this.state.username, this.state.email, this.state.password);}}
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

Signup.propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loginUser })(Signup);