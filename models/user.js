const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL for the profile picture
  sellingProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } // Products the user is selling
  ],
  buyingProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } // Products the user is buying
  ],
  dateOfBirth: { type: Date },
  chats:[{

    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  addresses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }],
  logs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Log'
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;