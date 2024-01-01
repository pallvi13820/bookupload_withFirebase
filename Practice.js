import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
const Practice = () => {
    const [amount, setAmount] = useState("")

    let list = [
        { title: "Arun", salary: 450000 },
        { title: "Adsrun", salary: 4500400 },
        { title: "Adsrun", salary: 45000340 },
        { title: "Arun", salary: 450000 },
        { title: "Adsrun", salary: 4500400 },
        { title: "Adsrun", salary: 45000340 },
        { title: "Arun", salary: 450000 },
        { title: "Adsrun", salary: 4500400 },
        { title: "Adsrun", salary: 45000340 },
        { title: "Arun", salary: 450000 },
        { title: "Adsrun", salary: 4500400 },
        { title: "Adsrun", salary: 45000340 }
    ]
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                console.log("kfjdf ");
                setAmount(json.length.toString())
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'cyan', padding: 20 }} >
                <View style={{ flex: 1, backgroundColor: 'red', flexDirection: 'row', padding: 20 }} >
                    <View style={{ backgroundColor: 'white', flex: 1 }} >
                        <Image style={{ flex: 1 }} source={{ uri: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=sph" }} />
                    </View>
                    <View style={{ backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }} >Text</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'yellow', alignItems: 'center' }}>
                    <TextInput
                        value={amount}
                        onChangeText={(text) => { setAmount(text) }}
                        placeholder={'Enter amount'}
                        style={{ height: 60, borderColor: 'red', borderBottomWidth: 2, margin: 10, width: '90%', color: 'red' }}
                    >

                    </TextInput>
                    <Button title='Button' onPress={() => { alert("Button Click") }} />
                    <Text style={{ backgroundColor: 'red', marginTop: 10, padding: 10, borderRadius: 10, color: "white" }} onPress={() => { setAmount("50") }} >Set Amount 50</Text>
                    <TouchableOpacity style={{ backgroundColor: 'blue', marginTop: 10, padding: 10, borderRadius: 10 }} onPress={() => setAmount("100")}>
                        <Text style={{ color: 'white' }}  >Touch Button Set Amount 100</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: 'pink', padding: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }} >Listing</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={list}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: "row", flex: 1, borderBottomWidth: 1, justifyContent: "space-between" }} >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{index + 1}. {item.title}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }} > {item.salary}</Text>
                                </View>
                            )
                        }}

                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Practice