import { Alert, PermissionsAndroid } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

export const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'App needs access to your storage to read files.',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission granted');
            return true
            // Perform the desired action after the permission is granted
        } else {
            console.log('Storage permission denied');
            return false

            // Handle the case where the permission is denied
        }
    } catch (error) {
        console.log('Error requesting storage permission:', error);
        return false

    }
};

export const selectImageFromLibrary = async () => {
    const granted = await requestStoragePermission()
    let file = null;
    if (granted) {
        const options = {
            storageOptions: {
                skipBackup: true,
                compressImageMaxWidth: 300,
                compressImageMaxHeight: 300,
                compressImageQuality: 0.8,
                path: "images",
            },
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        };
        try {
            const response = await ImagePicker.openPicker(options);
            if (response.didCancel) {
              console.log("User cancelled image picker");
              return false;
            } else if (response.error) {
              console.log("ImagePicker Error: ", response.error);
              return false;
            } else if (response.customButton) {
              console.log("User tapped custom button: ", response.customButton);
              return false;
            } else {
              let date = Date.now();
              file = {
                name: "Image" + date + ".jpg",
                type: response.mime,
                uri:
                  Platform.OS === "android"
                    ? response.path
                    : response.path.replace("file://", ""),
              };
            }
          } catch (error) {
            console.log("Error selecting image:", error);
            return false;
          }
    }
    else {
        Alert.alert("Permission Issue")
        return false
    }

    return file
};