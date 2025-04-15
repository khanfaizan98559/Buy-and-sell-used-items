const mongoose = require('mongoose');


// Define the address schema
const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Reference to the User who owns the address
  },
  alias: { type: String, required: true }, // Full name of the recipient
  street: { type: String, required: true }, // Street address
  city: { type: String, required: true }, // City
  state: { type: String, required: true }, // State
  zipCode: { type: Number, required: true }, // Postal/ZIP code
  country: { type: String, required: true }, // Country
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema) || mongoose.model('Address', addressSchema);
module.exports = Address; // Export the Address model