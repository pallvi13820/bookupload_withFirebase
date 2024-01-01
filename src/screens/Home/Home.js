import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { View } from 'react-native';
const booksCollection = firestore().collection('Books');
const userDocument = firestore().collection('Books').doc('bestseller');
const books_get = await firestore().collection('Books').get();
const books_doc_get = await firestore().collection('Books').doc('bestseller').get();
const Home = () => {
    const [data, setdata] = useState([])
    const [textvalue, settextvalue] = useState("")
    const [listData, setlistData] = useState({})
    const [loader, setloader] = useState(false)

    // useEffect(() => {
    //     apihit()
    // }, [])
    // function onResult(QuerySnapshot) {
    //     console.log('Got Users collection result.');
    //   }
      
    //   function onError(error) {
    //     console.error(error);
    //   }
      
    //   firestore().collection('Users').onSnapshot(onResult, onError);

    // const apihit = () => {
    //     if (textvalue !== "") {
    //         setloader(true)
    //         fetch('https://jsonplaceholder.typicode.com/posts/' + textvalue)
    //             .then(response => response.json())
    //             .then((res) => {
    //                 setloader(false)
    //                 setlistData(res);
    //             })
    //     }
    //     else {
    //         Alert.alert("Please enter value")
    //     }
    // }
    // const renderItemList = ({ item, index }) => {
    //     return (
    //         <View style={{ borderWidth: 1, backgroundColor: '#fff', borderRadius: 10, margin: 10, padding: 5, elevation: 20 }} >
    //             <Text style={{ color: '#000' }} >{index + 1} {item.title}</Text>
    //             <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 15, marginTop: 20 }} >Discription: </Text>
    //             <Text style={{ color: '#000' }} >{item.body}</Text>

    //         </View>
    //     )
    // }

    return (
        <View style={{ flex: 1 }} >
            <View style={{ marginVertical: 50 }}>
                {/* <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }} >Peoples name</Text>
                <TextInput
                    value={textvalue}
                    style={{ borderWidth: 1, margin: 10, height: 50, borderRadius: 10, textAlign: "center" }}
                    onChangeText={(text) => { settextvalue(text) }}
                />
                <Text
                    onPress={() => apihit()}
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 18,
                        borderWidth: 1,
                        margin: 20, padding: 10,
                        backgroundColor: 'purple'
                    }} >Show</Text>
                <View style={{ borderWidth: 1, backgroundColor: '#fff', borderRadius: 10, margin: 10, padding: 5, elevation: 20 }} >
                    <Text style={{ color: '#000' }} > {listData.title}</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 15, marginTop: 20 }} >Discription: </Text>
                    <Text style={{ color: '#000' }} >{listData.body}</Text>

                </View> */}
                {/* <FlatList
                    data={data}
                    renderItem={renderItemList}
                    keyExtractor={item => item.id}
                /> */}
                {/* {
                    loader &&
                    <ActivityIndicator size="large" color="#0000ff" />

                } */}
            </View>

        </View>
    )
}

export default Home