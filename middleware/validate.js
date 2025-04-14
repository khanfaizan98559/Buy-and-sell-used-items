const Joi = require('joi');

// Validate User
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dateOfBirth: Joi.date().optional(),
    profilePicture: Joi.string().uri().optional(),
  });
  return schema.validate(data);
};

// Validate Product
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).required(),
    price: Joi.number().required(),
    offerPrice: Joi.number().required(),
    description: Joi.string().required(),
    features: Joi.array().items(Joi.string()).optional(),
    brand: Joi.string().required(),
    services: Joi.array().items(Joi.string()).optional(),
    location: Joi.string().required(),
    category: Joi.string().required(),
    seller: Joi.string().required(),
  });
  return schema.validate(data);
};

// Validate Category
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    coverImage: Joi.string().uri().required(),
    products: Joi.array().items(Joi.string()).optional(),
  });
  return schema.validate(data);
};

// Validate Chat
const validateChat = (data) => {
  const schema = Joi.object({
    participants: Joi.array().items(Joi.string().required()).length(2).required(),
    messages: Joi.array().items(Joi.string()).optional(),
    lastMessage: Joi.string().optional(),
  });
  return schema.validate(data);
};

// Validate Message
const validateMessage = (data) => {
  const schema = Joi.object({
    chat: Joi.string().required(),
    sender: Joi.string().required(),
    content: Joi.string().required(),
    timestamp: Joi.date().optional(),
  });
  return schema.validate(data);
};

// Validate Address
const validateAddress = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    isDefault: Joi.boolean().optional(),
  });
  return schema.validate(data);
};

// Validate Log
const validateLog = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    actionType: Joi.string().valid('PRODUCT_VISIT', 'SEARCH', 'LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE').required(),
    details: Joi.string().required(),
    timestamp: Joi.date().optional(),
    metadata: Joi.object().optional(),
  });
  return schema.validate(data);
};

module.exports = {
  validateUser,
  validateProduct,
  validateCategory,
  validateChat,
  validateMessage,
  validateAddress,
  validateLog,
};