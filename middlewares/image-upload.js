const multer = require("multer");
let uuid;
(async () => {
  const uuidModule = await import("uuid");
  uuid = uuidModule.v4;
})();

const sotrageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "product-data/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const upload = multer({ storage: sotrageConfig });

const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
