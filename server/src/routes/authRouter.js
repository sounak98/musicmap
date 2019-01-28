/**
 * router to handle all auth related routes
 */
import _ from 'lodash';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { 
    UserModel,
    saveUser, 
    verifyPassword, 
    changePassword, 
    removeUser, 
    isUsernameAvailable, 
    updateLastLoginOn 
} from '../models/userModel';
import { jwtOptions } from '../passport';
import { ok } from 'assert';

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    
    UserModel.findOne({ username }).exec((err, user) => {
        if (err) {
            // check what will trigger this
        }
        if (!user) {
            res.status(401).json({ message: "No such user found" });
        }
        else {
            verifyPassword(password, user.password, result => {
                if (result) {
                    updateLastLoginOn(user._id, result => {
                        if (result) {
                            var payload = { username: user.username, email: user.email };
                            var token = jwt.sign(payload, jwtOptions.secretOrKey);
                            res.json({ status: "ok", token, user: {
                                "username": user.username,
                                "email": user.email
                            } });
                        }
                        else {
                            res.status(401).json({ message: "Could not update lastLoginOn" });
                        }
                    });
                }
                else {
                    res.status(401).json({ message: "Password did not match" });
                }
            });
        }
    });
});

authRouter.get("/getUser", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
    // res.json({ user: {
    //     "username": req.user.username,
    //     "email": req.user.email
    // } });
});

authRouter.post("/changePassword", passport.authenticate('jwt', { session: false }), (req, res) => {
    changePassword(req.user.id, req.body.password, result => {
        if (result) {
            res.json({ status: "ok", message: "Password changed successfully" });
        }
        else {
            res.status(400);
        }
    });
});

authRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ status: "ok", message: "Welcome!" });
});

authRouter.get('/remove', passport.authenticate('jwt', { session: false }), (req, res) => {
    removeUser(req.user._id, result => {
        if (result) {
            res.json({ status: "ok", message: "User deleted" })
        }
        else {
            res.status(400).json({ message: err });
        }
    });    
});

authRouter.get('/available', (req, res) => {
    isUsernameAvailable(req.query.username, result => {
        res.json({ message: result });
    });
});

authRouter.post('/signup', (req, res) => {
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    saveUser(newUser, (err, data) => {
        if (err) {
            res.status(400).json({ message: err._message });
        }
        else {
            res.json({ message: "User created" });
        }
    });
});

export default authRouter;