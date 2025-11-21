const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

router.get("/products", adminController.getProducts);
router.get("/products/new", adminController.getNewProducts);
router.post("/products", imageUploadMiddleware, adminController.createNewProduct);
router.get("/products/:id", adminController.getUpdateProduct)
router.post("/products/:id",imageUploadMiddleware, adminController.updateProduct)


// router.get("/products/delete/:id", adminController.deleteProduct);
router.delete("/products/:id", adminController.deleteProduct); 
module.exports = router;
 