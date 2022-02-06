const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    username: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    class_type: {
        type: String,

    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    }

})






const User = new mongoose.model('User', userSchema);

module.exports = User;