import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema } from '../schemas/UserSchema'

let UserModel = mongoose.model('users', UserSchema);

const saveUser = (newUser, cb) => {
    const saltRounds = 10;
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        newUser.password = hash;
        let user = new UserModel(newUser);
        user.save((err, data) => {
            if (err) return cb(err);
            cb(null, data);
        });
    });
}

const verifyPassword = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, res) => {
        cb(res);
    });
}

const changePassword = (id, password, cb) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        UserModel.findOneAndUpdate({ _id: id }, { password: hash }, { new: true }).exec((err, user) => {
            if (err) {
                cb(false);
            }
            if (!user) {
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
        if (!user) {
            cb(false);
        }
        else {
            cb(true);
        }
    });
};

export { UserModel, saveUser, verifyPassword, changePassword, removeUser };
