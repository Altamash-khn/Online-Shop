const multer = require("multer");
const cloudinary = require("../utils/cloudinary-config");
const cloudinaryStorage = require("multer-storage-cloudinary");

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "products",
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
});

const upload = multer({ storage });

module.exports = upload.single("image");
