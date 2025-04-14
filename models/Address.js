const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Reference to the User who owns the address
  },
  fullName: { type: String, required: true }, // Full name of the recipient
  phone: { type: String, required: true }, // Phone number
  street: { type: String, required: true }, // Street address
  city: { type: String, required: true }, // City
  state: { type: String, required: true }, // State
  postalCode: { type: String, required: true }, // Postal/ZIP code
  country: { type: String, required: true }, // Country
  isDefault: { type: Boolean, default: false } // Indicates if this is the default address
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);