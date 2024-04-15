const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const { v4 } = require("uuid");
const fs = require("fs")

const firebaseConfig = {
  apiKey: "AIzaSyB41tbzuwQ_Ji71z4bo4hkO1kYP9WNB538",
  authDomain: "uploadingfile-95e4b.firebaseapp.com",
  projectId: "uploadingfile-95e4b",
  storageBucket: "uploadingfile-95e4b.appspot.com",
  messagingSenderId: "353142662971",
  appId: "1:353142662971:web:777d680ab371fa0224b91e"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function uploadImageToFirebase(imageUpload) {
    try {
        const uniqueFileName = `${v4()}_${imageUpload.originalname}`;
        const imageRef = ref(storage, `images/${uniqueFileName}`);
        
        const fileData = fs.readFileSync(imageUpload.path);
        
        await uploadBytes(imageRef, fileData, { contentType: imageUpload.mimetype });
        
        const url = await getDownloadURL(imageRef);
        
        return {
            url: url,
            originalname: imageUpload.originalname,
            public_id: uniqueFileName,
        };
    } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        throw error;
    }
}

async function deleteFirebaseImages(imageDelete) {
    try {
        console.log("Deleting images:", imageDelete);

        const deletePromises = imageDelete.map(async (publicId) => {
            const imageRef = ref(storage, `images/${publicId}`);
            console.log("Deleting image:", imageRef.toString());

            try {
                await deleteObject(imageRef);
                console.log("Image deleted:", publicId);
            } catch (deleteError) {
                console.error("Error deleting image:", publicId, deleteError);
                throw deleteError;
            }
        });

        await Promise.all(deletePromises);

        console.log("Images deleted successfully from Firebase Storage");
    } catch (error) {
        console.error("Error deleting images:", error);
        throw error;
    }
}

async function uploadBrandToFirebase(imageUpload) {
    try {
        const uniqueFileName = `${v4()}_${imageUpload.originalname}`;
        const imageRef = ref(storage, `brands/${uniqueFileName}`);
        
        const fileData = fs.readFileSync(imageUpload.path);
        
        await uploadBytes(imageRef, fileData, { contentType: imageUpload.mimetype });
        
        const url = await getDownloadURL(imageRef);
        
        return {
            url: url,
            originalname: imageUpload.originalname,
            public_id: uniqueFileName,
        };

    } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        throw error;
    }
}

async function deleteFirebaseBrand(imageDelete) {
    try {
        console.log("Deleting images:", imageDelete);
  
        const imageRef = ref(storage, `brands/${imageDelete}`);
        console.log("Deleting image:", imageRef.toString());
        
        try {
            await deleteObject(imageRef);
            console.log("Image deleted:", imageDelete);
        } catch (deleteError) {
            console.error("Error deleting image:", imageDelete, deleteError);
            throw deleteError;
        }

    } catch (error) {
        console.error("Error deleting images:", error);
        throw error;
    }
}

async function uploadImageProduct(imageUpload) {
    try {
        const uniqueFileName = `${v4()}_${imageUpload.originalname}`;
        const imageRef = ref(storage, `products/${uniqueFileName}`);
        
        const fileData = fs.readFileSync(imageUpload.path);
        
        await uploadBytes(imageRef, fileData, { contentType: imageUpload.mimetype });
        
        const url = await getDownloadURL(imageRef);
        
        return {
            url: url,
            originalname: imageUpload.originalname,
            public_id: uniqueFileName,
        };
    } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        throw error;
    }
}

async function deleteImageProduct(imageDelete) {
    try {
        console.log("Deleting images:", imageDelete);

        const deletePromises = imageDelete.map(async (publicId) => {
            const imageRef = ref(storage, `products/${publicId}`);
            console.log("Deleting image:", imageRef.toString());

            try {
                await deleteObject(imageRef);
                console.log("Image deleted:", publicId);
            } catch (deleteError) {
                console.error("Error deleting image:", publicId, deleteError);
                throw deleteError;
            }
        });

        await Promise.all(deletePromises);

        console.log("Images deleted successfully from Firebase Storage");
    } catch (error) {
        console.error("Error deleting images:", error);
        throw error;
    }
}

module.exports = {  uploadImageToFirebase, deleteFirebaseImages, uploadBrandToFirebase, deleteFirebaseBrand, uploadImageProduct, deleteImageProduct };