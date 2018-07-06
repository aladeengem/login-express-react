var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    address: String,
}, {
    collection: 'users'
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;