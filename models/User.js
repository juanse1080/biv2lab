const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: 'String', lowercase: true, required: [true, "can't be blank"], match: [/^[a-z ,.'-]+$/i, 'is invalid'] },
    last_name: { type: 'String', lowercase: true, required: [true, "can't be blank"], match: [/^[a-z ,.'-]+$/i, 'is invalid'] },
    birthdate: { type: Date, required: true },
    email: { type: String, lowercase: true, unique: [true, "email already exists"], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    password: { type: 'String', required: true },
    role: { type: Number, default: 1 },
    education: { type: 'String', required: true },
    photo: { type: 'String' },
    production: { type: [{ type: Schema.Types.ObjectId, ref: 'Product' }] },
    biography: { type: 'String' },
}, { timestamps: true });

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

let User = mongoose.model('User', UserSchema);

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

module.export = User = mongoose.model('User', UserSchema);