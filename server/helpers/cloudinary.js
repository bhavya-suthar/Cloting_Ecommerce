const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dg0vwtbuq",
  api_key: "293156579122914",
  api_secret: "uisHhzU8g8xSfvacPQ3Rpq3-MDI",
});

const storage = new multer.memoryStorage();

async function ImageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({
  storage,
});

module.exports = {upload,ImageUploadUtils}