const multer = require("multer");
const cloudinary = require("../utils/cloudinary-config");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",  // folder name on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({ storage: storage });

const configuredMulterMiddleware = upload.single("image");
module.exports = configuredMulterMiddleware
