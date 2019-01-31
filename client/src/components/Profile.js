import React, { Component } from 'react';
import Auth from '../api/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Login.css';

const auth = new Auth();

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            validationError: null,
            passwordChanged: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    async changePassword(oldPassword, newPassword) {
        const err = await auth.changePassword(oldPassword, newPassword);
        if (!err) {
            this.setState({ passwordChanged: true });
            console.log("User will be logged out for security reasons, login again to continue");
        }
        else {
            this.setState({ validationError: err });
            console.log(err);
        }
    }

    render() {
        const validated = (
            this.state.oldPassword &&                               // old password is entered
            this.state.newPassword &&                               // new password is entered
            this.state.repeatPassword &&                            // password is repeated
            this.state.newPassword == this.state.repeatPassword     // repeated password is same as the password
        );

        if (this.state.passwordChanged) {
            return (<Redirect to="/logout" />);
        }

        return (
            <div className="center">
                <div className="card">
                    <h1>Profile</h1>
                    <form>
                    {this.state.validationError && <div className="form-item-footer failure">{this.state.validationError}</div>}
                        <input
                            className="form-item"
                            placeholder="Old password goes here..."
                            name="oldPassword"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="New password goes here..."
                            name="newPassword"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className={this.state.repeatPassword ? "form-item footer-below" : "form-item"}
                            placeholder="Repeat your password..."
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
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                            disabled={!validated}
                            onClick={async (e) => {e.preventDefault(); await this.changePassword(this.state.oldPassword, this.state.newPassword);}}
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

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Profile);