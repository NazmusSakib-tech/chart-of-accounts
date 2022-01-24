const mongoose = require('mongoose');


const chartOfAccountSchema = new mongoose.Schema({
    c_id: {
        type: String,

    },
    class_code: {
        type: String,

    },
    class_name: {
        type: String,

    },
    class_type: {
        type: String,
        unique: true
    },
    active_status: {
        type: Boolean
    },
    group: [
        {
            group_code:
            {
                type: Number
            },
            group_name:
            {
                type: String
            },

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

//we will create a new collection

const chartOfAccount = new mongoose.model('chartOfAccount', chartOfAccountSchema);

module.exports = chartOfAccount;