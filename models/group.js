const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new mongoose.Schema({
    group_code: {
        type: String,
    },
    group_name: {
        type: String,
    },
    // class_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'ChartOfAccount'
    // }
});


//we will create a new collection

const Group = new mongoose.model('Group', groupSchema);

module.exports = Group;