import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema } from '../schemas/UserSchema'

let UserModel = mongoose.model('users', UserSchema);

const saveUser = (newUser, cb) => {
    const saltRounds = 10;
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        newUser.password = hash;
        let now = new Date();
        newUser.createdOn = now;
        newUser.lastModifiedOn = now;
        newUser.lastLoginOn = now;
        let user = new UserModel(newUser);
        user.save((err, data) => {
            if (err) return cb(err);
            cb(null, data);
        });
    });
}

const updateLastLoginOn = (id, cb) => {
    let now = new Date();
    UserModel.findOneAndUpdate({ _id: id }, { lastLoginOn: now }, { new: true }).exec((err, user) => {
        if (err) {
            cb(false);
        }
        else if (!user) {
            cb(false);
        }
        else {
            cb(true);
        }
    })
}

const verifyPassword = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, res) => {
        cb(res);
    });
}

const changePassword = (id, password, cb) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        let now = new Date();
        UserModel.findOneAndUpdate({ _id: id }, { password: hash, lastModifiedOn: now }, { new: true }).exec((err, user) => {
            if (err) {
                cb(false);
            }
            else if (!user) {
                cb(false);
            }
            else {
                cb(true);
            }
        });
    })
}

const removeUser = (id, cb) => {
    UserModel.findOneAndRemove({ _id: id }).exec((err, user) => {
        if (err) {
            cb(false);
        }
        else if (!user) {
            cb(false);
        }
        else {
            cb(true);
        }
    });
};

const isUsernameAvailable = (username, cb) => {
    UserModel.findOne({ username }).exec((err, user) => {
        if (!user) {
            cb(true);
        }
        else {
            cb(false);
        }
    })
}

export { UserModel, saveUser, verifyPassword, changePassword, removeUser, isUsernameAvailable, updateLastLoginOn };
