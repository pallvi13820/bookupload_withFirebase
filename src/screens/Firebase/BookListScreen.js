import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { selectImageFromLibrary } from './CommonFunction';
import { fetchBookList, uploadImagesToStorage } from './FirebaseFunctions';
const BookListScreen = () => {
  const [pickedImage, setPickedImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [secretKey, setsecretKey] = useState(false);
  const [secretKeyPassword, setSecretKeyPassword] = useState("");
  const [hideAdminInputfield, sethideAdminInpuTfield] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    let updatedData = await fetchBookList()
    setImagesList(updatedData.reverse())
    setLoader(false)
  }
  const AddDataInFireStore = async () => {
    setLoader(true)

    const isDataValid = pickedImage.uri && imageName.trim() !== "";
    if (isDataValid) {
      const bookData = [];
      bookData.push({ imagePath: pickedImage.uri, imageName: imageName });
      const finalUpdateData = await uploadImagesToStorage(bookData)
      if (finalUpdateData) {
        setLoader(false)
        setImageName("")
        setPickedImage({})
        fetchData()
      }
    } else {
      setLoader(false)
      Alert.alert("Invalid Data")
    }
  }
  const addimage = async () => {
    setLoader(false)
    const file = await selectImageFromLibrary()
    if (file) {
      setPickedImage(file)
    }
    setLoader(false)
  }
  const renderItemList = ({ item, index }) => {
    return (
      <View key={item.id} style={{ borderWidth: 1, backgroundColor: '#fff', borderRadius: 10, margin: 10, padding: 5, elevation: 20 }} >
        <Text key={item.id} style={{ color: '#000', textAlign: 'center', fontSize: 20 }} >{index + 1} {item.imageName}</Text>
        <Image key={item.id} resizeMode="contain" source={{ uri: item.downloadURL }} style={{ width: 300, alignSelf: "center", margin: 20, height: 300 }} />
      </View>
    )
  }
  const verifyAdmin = () => {
    if (secretKeyPassword === "123456") {
      sethideAdminInpuTfield(true)
    }
    else {
      Alert.alert("Invalid Creds")
    }
  }
  const clickCustomerTab = () => {
    setsecretKey(false)
    sethideAdminInpuTfield(false)
    setSecretKeyPassword("")
  }
  return (
    <View style={{ flex: 1 }} >
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
        <TouchableOpacity onPress={() => clickCustomerTab()} style={{ borderWidth: 1, borderRadius: 20, marginVertical: 20, justifyContent: "center", alignItems: "center", height: 40, width: 150 }} >
          <Text style={{ fontSize: 16, color: 'black' }}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setsecretKey(true)} style={{ borderWidth: 1, borderRadius: 20, marginVertical: 20, justifyContent: "center", alignItems: "center", height: 40, width: 150 }} >
          <Text style={{ fontSize: 16, color: 'black' }} >Admin</Text>
        </TouchableOpacity>
      </View>
      {
        (secretKey && !hideAdminInputfield) && (
          <View style={{ alignItems: "center" }} >
            <TextInput
              value={secretKeyPassword}
              onChangeText={(text) => {
                setSecretKeyPassword(text)
              }}
              style={{ height: 40, width: '90%', borderWidth: 1, borderRadius: 10, padding: 10, margin: "5%" }}
              placeholder={"Admin Password"}
            />
            <Text onPress={() => verifyAdmin()} style={{ elevation: 10, width: 150, margin: 20, borderRadius: 20, paddingVertical: 10, alignSelf: "center", textAlign: "center", fontSize: 15, fontWeight: "bold", backgroundColor: "orange", color: 'white' }}  >
              Verify
            </Text>
          </View>
        )
      }
      {
        hideAdminInputfield && (
          <>
            <View style={{ flexDirection: 'row', alignItems: "center" }} >

              <TextInput
                value={imageName}
                onChangeText={(text) => setImageName(text)}
                style={{ height: 40, width: '90%', borderWidth: 1, borderRadius: 10, padding: 10, margin: "5%" }}
                placeholder={"book name"}
              />
            </View>
            <Text onPress={() => addimage()} style={{ elevation: 10, width: 150, margin: 20, borderRadius: 20, paddingVertical: 10, alignSelf: "center", textAlign: "center", fontSize: 15, fontWeight: "bold", backgroundColor: "orange", color: 'white' }}  >
              Select Image
            </Text>
            {pickedImage.uri && <Image source={{ uri: pickedImage.uri }} style={{ width: 200, alignSelf: "center", margin: 20, height: 200 }} />}
            <Text onPress={() => AddDataInFireStore()} style={{ marginBottom: 20, elevation: 10, width: 100, borderRadius: 20, paddingVertical: 10, alignSelf: "center", textAlign: "center", fontSize: 15, fontWeight: "bold", backgroundColor: "black", color: 'white' }}  >
              Add
            </Text>
          </>
        )
      }


      {
        loader && <ActivityIndicator size={"large"} />
      }
      <View style={{ flex: 1 }} >
        <FlatList
          data={imagesList}
          renderItem={renderItemList}
          keyExtractor={item => item.id}
          style={{ flex: 1, marginBottom: 20 }}
        />
      </View>

    </View>
  );
};

export default BookListScreen;
