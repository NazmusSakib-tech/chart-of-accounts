const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    account_code: {
        type: String,
    },
    account_name: {
        type: String,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }

})


const Account = new mongoose.model('Account', accountSchema)
module.exports = Account;
