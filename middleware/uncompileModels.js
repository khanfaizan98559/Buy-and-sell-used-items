const mongoose = require("mongoose");

if (mongoose.models) {
  Object.keys(mongoose.models).forEach(modelName => {
    delete mongoose.models[modelName];
  });
}

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
