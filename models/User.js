const mongoose  =   require('mongoose'),
      {isEmail} =   require('validator'),
      bcrypt    =   require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true,'email cannot be empty!'],
        unique: true,
        validate: {
            validator: isEmail,
            message: '{VALUE} is an invalid email'
        }
    },
    password: {
        type: String,
        required: [true,'password cannot be empty'],
        minLength: [8,'password should be at least 8 characters long']
    }
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model('user',userSchema);

module.exports = User;