const mongoose  =   require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
})

const User = mongoose.model('user',userSchema);

module.exports = User;