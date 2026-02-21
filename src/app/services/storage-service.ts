import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  uploadBytesResumable,
  UploadTaskSnapshot
} from 'firebase/storage';
import { storage } from './firebase-config';

// ========== IMAGES ==========

export async function uploadProductImage(productId: string, file: File): Promise<string> {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `products/${productId}/${timestamp}-${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
}

export async function uploadProductImageWithProgress(
  productId: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `products/${productId}/${timestamp}-${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error uploading product image with progress:', error);
    throw error;
  }
}

export async function uploadCategoryImage(categoryId: string, file: File): Promise<string> {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `categories/${categoryId}/${timestamp}-${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading category image:', error);
    throw error;
  }
}

export async function uploadUserProfileImage(userId: string, file: File): Promise<string> {
  try {
    const storageRef = ref(storage, `users/${userId}/profile-${Date.now()}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading user profile image:', error);
    throw error;
  }
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const urlParams = new URL(imageUrl).searchParams;
    const filePath = decodeURIComponent(urlParams.get('alt') || '');
    
    if (filePath) {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - just log the error as it might be an external URL
  }
}

// ========== FILES ==========

export async function uploadFile(folder: string, file: File): Promise<string> {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `${folder}/${timestamp}-${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function uploadFileWithProgress(
  folder: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `${folder}/${timestamp}-${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file with progress:', error);
    throw error;
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const urlParams = new URL(fileUrl).searchParams;
    const filePath = decodeURIComponent(urlParams.get('alt') || '');
    
    if (filePath) {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    // Don't throw - just log the error as it might be an external URL
  }
}

// ========== BULK OPERATIONS ==========

export async function deleteFolder(folderPath: string): Promise<void> {
  try {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef);
    
    // Delete all files
    for (const fileRef of fileList.items) {
      await deleteObject(fileRef);
    }
    
    // Delete all subdirectories
    for (const subFolder of fileList.prefixes) {
      await deleteFolder(subFolder.fullPath);
    }
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
}

export async function listFiles(folderPath: string): Promise<string[]> {
  try {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef);
    
    const urls: string[] = [];
    for (const fileRef of fileList.items) {
      const downloadUrl = await getDownloadURL(fileRef);
      urls.push(downloadUrl);
    }
    
    return urls;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}
