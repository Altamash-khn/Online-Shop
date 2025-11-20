console.log("hello world");
const imagePickerElement = document.querySelector(
  "#image-upload-control input"
);
const imagePreviewElement = document.querySelector("#image-upload-control img");

function updateImagePreview() {
  const files = imagePickerElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }
  const img = files[0];
  imagePreviewElement.src = URL.createObjectURL(img);
  imagePreviewElement.style.display = "block";
}

imagePickerElement.addEventListener("change", updateImagePreview);
