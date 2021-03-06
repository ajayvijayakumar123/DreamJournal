const mongoose = require('mongoose'); //helps connect to mongoose
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;