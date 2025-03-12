import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs";

export const uploadToStorage = async (file) => {
  const storage = getStorage();
  const fileBuffer = fs.readFileSync(file.filepath); // Read the file from Formidable
  const storageRef = ref(storage, `sellingPorsche/${file.originalFilename}`);

  // Upload the file to Firebase Storage
  await uploadBytes(storageRef, fileBuffer);

  // Get the public URL for the uploaded image
  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
};
