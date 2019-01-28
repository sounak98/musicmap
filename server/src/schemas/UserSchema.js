import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: [true, "can't be blank"], unique: true, lowercase: true, index: true},
    email: {type: String, required: [true, "can't be blank"], unique: true, lowercase: true, index: true},
    password: {type: String, required: false},
    createdOn: {type: Date, required: true},
    lastModifiedOn: {type: Date, required: true},
    lastLoginOn: {type: Date, required: true}
}, { timestamps: false });

UserSchema.plugin(uniqueValidator, { message: "is already taken" });

export { UserSchema };