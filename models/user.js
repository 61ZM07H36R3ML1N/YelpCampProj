const mongoose = require('mongoose');
const passportlocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
UserSchema.plugin(passportlocalMongoose);

module.exports = mongoose.model('User', UserSchema);