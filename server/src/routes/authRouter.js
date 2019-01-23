/**
 * router to handle all auth related routes
 */
import _ from 'lodash';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { UserModel, saveUser, verifyPassword, changePassword, removeUser } from '../models/userModel';
import { jwtOptions } from '../passport';
import { ok } from 'assert';

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }
    
    UserModel.findOne({ email }).exec((err, user) => {
        if (err) {
            // check what will trigger this
        }
        if (!user) {
            res.status(401).json({ message: "no such user found" });
        }
        else {
            verifyPassword(password, user.password, result => {
                if (result) {
                    var payload = { id: user._id };
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({ status: "ok", token, user: {
                        "username": user.username,
                        "email": user.email
                    } });
                }
                else {
                    res.status(401).json({ message: "password did not match" });
                }
            });
        }
    });
});

authRouter.post("/changePassword", passport.authenticate('jwt', { session: false }), (req, res) => {
    changePassword(req.user.id, req.body.password, result => {
        if (result) {
            res.json({ status: "ok", message: "password changed successfully" });
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
            res.json({ status: "ok", message: "user deleted" })
        }
        else {
            res.status(400).json({ message: err });
        }
    });    
});

authRouter.get('/available', (req, res) => {
    const username = req.query.username;
    
    UserModel.findOne({ username }).exec((err, user) => {
        if (!user) {
            res.json({ message: true });
        }
        else {
            res.json({ message: false });
        }
    })
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
            res.json({ status: "ok", message: "user created" });
        }
    });
});

export default authRouter;