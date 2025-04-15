const Joi = require('joi');

// Validate User
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phoneNo: Joi.string().required(),
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
    details: Joi.object({
      title: Joi.string().required(), // Product title
      category: Joi.string().required(), // Category ID (ObjectId as a string)
      condition: Joi.string().valid('new', 'used').required(), // Product condition
      description: Joi.string().required(), // Product description
      features: Joi.array().items(
        Joi.object({
          featureType: Joi.string().required(), // Feature type (e.g., color, size)
          featureValue: Joi.string().required(), // Feature value (e.g., red, large)
        })
      ).optional(), // List of product features
    }).required(),

    images: Joi.array().items(Joi.string().uri()).optional(), // Array of image URLs

    pricing: Joi.object({
      basePrice: Joi.number().required(), // Original price
      offerPrice: Joi.number().optional(), // Discounted price
      discountedPrice: Joi.number().optional(), // Price after discount
      taxRate: Joi.number().required(), // Tax rate
      shippingOptions: Joi.object({
        freeShipping: Joi.boolean().optional(), // Free shipping option
        shippingCost: Joi.number().optional(), // Shipping cost
        returnPolicy: Joi.string().valid('No', '30-days', '7-days').optional(), // Return policy
      }).optional(),
    }).required(),

    address: Joi.string().optional(), // Address ID (ObjectId as a string)

    seller: Joi.string().optional(), // Seller ID (ObjectId as a string)
    buyer: Joi.string().optional(), // Buyer ID (ObjectId as a string, optional)
  });

  return schema.validate(data);
};

// Validate Category
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    coverImage: Joi.string().uri().optional(),
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
    alisa: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
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