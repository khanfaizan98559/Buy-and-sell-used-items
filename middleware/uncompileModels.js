const mongoose = require("mongoose");

module.exports.main = () => {
  if (mongoose.models) {
    Object.keys(mongoose.models).forEach(modelName => {
      delete mongoose.models[modelName];
    });
  }

  if (mongoose.modelSchemas) {
    Object.keys(mongoose.modelSchemas).forEach(modelName => {
      delete mongoose.modelSchemas[modelName];
    });
  }
};
