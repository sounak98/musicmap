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

const verifyPassword = async (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, res) => {
        cb(res);
    });
}

export { UserModel, saveUser, verifyPassword };
