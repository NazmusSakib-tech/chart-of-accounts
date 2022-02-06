const mongoose = require('mongoose');
const { Schema } = mongoose;


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

    },
    active_status: {
        type: Boolean
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],
    teamMembers: [
        {
            mobile: String,
            designation: String
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


// Data Grip for backup of mongodb 