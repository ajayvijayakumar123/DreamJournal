const mongoose = require('mongoose'); //helps connect to mongoose
const Schema = mongoose.Schema;

var dream = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Dream = mongoose.model('Dream', dream);
module.exports = Dream;