function csrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: 'dzpuer54o',
//   api_key: '327315239255793',
//   api_secret: 'gBXL7J30oabmHUiN1SA6XfP9k4E',
// });

// // Count all uploaded images
// async function countImages() {
//   try {
//     const result = await cloudinary.api.resources({
//       type: "upload",
//       resource_type: "image",
//       max_results: 500
//     });

//     console.log("Total images:", result.resources.length);

//     result.resources.forEach(asset => {
//       console.log("Public ID:", asset.public_id);
//       console.log("Folder:", asset.folder || "No folder");
//       console.log("URL:", asset.secure_url);
//       console.log("------");
//     });

//   } catch (error) {
//     console.error(error);
//   }
// }

// countImages();


module.exports = csrfToken;
