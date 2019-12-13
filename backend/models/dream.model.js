const mongoose = require('mongoose'); //helps connect to mongoose
const Schema = mongoose.Schema;

var dreamSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    weird: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

const Dream = mongoose.model('Dream', dreamSchema);
module.exports = Dream;