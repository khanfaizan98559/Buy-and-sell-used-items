const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "SwapNest",
    allowerdFormats: ["png","jpg","jpeg"], // supports promises as well
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "SwapNest/products",
    allowerdFormats: ["png","jpg","jpeg"], // supports promises as well
    public_id: (req, file) => "computed-filename-using-request",
  },
});

module.exports = {
    cloudinary,
    storage,
};