import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const fetchBookList = async () => {
    try {
        const booksCollectionRef = firestore().collection('books');

        const documentSnapshot = await booksCollectionRef.doc('bookList').get();

        if (documentSnapshot.exists) {
            const documentData = documentSnapshot.data();
            if (documentData) {
                const { bookNames } = documentData;
                return bookNames
            }
        } else {
            console.log('Book list document does not exist');
            return []
        }
    } catch (error) {
        console.log('Error fetching book list:', error);
        return []

    }
};


export const addBookList = async (imageUploadResult) => {
    try {
        const booksCollectionRef = firestore().collection('books');
        let oldData = await fetchBookList()
        if (typeof (oldData) === "object") {
            oldData.push({ id: oldData.length + 1, downloadURL: imageUploadResult.downloadURL, imageName: imageUploadResult.imageName })
            await booksCollectionRef.doc('bookList').set({
                bookNames: oldData
            });
            return true
        }
    } catch (error) {
        console.log('Error adding book list:', error);
        return false

    }
};


const uploadImageAndAddToFirestore = async (imageNameParam, imagePathParam) => {

    const imageUploadResult = await uploadImageToStorage(imageNameParam, imagePathParam);
    let added = addBookList(imageUploadResult)
    if (added) {
        let updatedData = await fetchBookList()
        return updatedData
    }
};

const uploadImageToStorage = async (imageName, imagePath) => {
    try {
        const reference = storage().ref(`booksImages/${imageName}`);
        const response = await reference.putFile(imagePath);
        const downloadURL = await reference.getDownloadURL();

        return { imageName, downloadURL };
    } catch (error) {
        console.log('Error uploading image to Firebase Storage:', error);
        return null;
    }
};

export const uploadImagesToStorage = async (bookData) => {
    const updateData = uploadImageAndAddToFirestore(bookData[0].imageName, bookData[0].imagePath);
    return updateData
};