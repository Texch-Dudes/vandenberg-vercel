// Helper function to upload image and get URL
export const uploadImageAndGetUrl = async (file) => {
  const formData = new FormData();
  formData.append("images", file);

  const response = await fetch("https://api.essencityh.com/api/images/upload", {
    
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  console.log("Uploaded image URLs:", data.images);
  return data.images.map(image => image.imageUrl);
};
