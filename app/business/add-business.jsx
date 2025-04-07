import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from '../../configs/FireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../../configs/FireBaseConfig';
export default function AddBusiness() {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [website, setWebsite] = useState();
    const [about, setAbout] = useState();
    const [category, setCategory] = useState();
    const user = auth.currentUser;
    const fullName = user?.email;
    const email = user.email;
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
        GetCategoryList();
    }, [])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri);
        console.log(result)
    }

    const GetCategoryList = async () => {
        setCategoryList([])
        const q = query(collection(db, 'Category'));
        const snapShot = await getDocs(q);

        snapShot.forEach((doc) => {
            // console.log(doc.data());
            setCategoryList(prev => [...prev, {
                label: (doc.data()).name,
                value: (doc.data()).name
            }])
        })
    }

    const onAddNewBusiness = async () => {
        setLoading(true);
        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = ref(storage, 'business-app/' + fileName);

        uploadBytes(imageRef, blob).then((snapshot) => {
            // console.log("File uploaded...")
        }).then(resp => {
            getDownloadURL(imageRef).then(async (downloadURL) => {
                // console.log(downloadURL);
                saveBusinessDetail(downloadURL);
            })
        })
        setLoading(false);
        navigation.navigate('home')
    }


    const saveBusinessDetail = async (imageURL) => {
        await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            about: about,
            website: website,
            category: category,
            username: fullName,
            imageURL: imageURL,
            email: email,
        })
        setLoading(false);
        ToastAndroid.show('New business added...', ToastAndroid.LONG)
    }

    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Add New Business</Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                color: Colors.gray
            }}>Fill all details in order to add new business </Text>

            <TouchableOpacity
                onPress={() => onImagePick()}
                style={{
                    marginTop: 20
                }}>
                {!image ? <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={require('./../../assets/images/getimage.png')} /> :
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15
                        }}
                        source={{ uri: image }} />}
            </TouchableOpacity>

            <View>
                <TextInput placeholder='Name'
                    onChangeText={(v) => setName(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        fontFamily: 'outfit-medium',
                        borderColor: Colors.primary
                    }}
                />
                <TextInput placeholder='Address'
                    onChangeText={(v) => setAddress(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        fontFamily: 'outfit-medium',
                        borderColor: Colors.primary
                    }}
                />
                <TextInput placeholder='Contact'
                    onChangeText={(v) => setContact(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        fontFamily: 'outfit-medium',
                        borderColor: Colors.primary
                    }}
                />
                <TextInput placeholder='Website'
                    onChangeText={(v) => setWebsite(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        fontFamily: 'outfit-medium',
                        borderColor: Colors.primary
                    }}
                />
                <TextInput placeholder='About'
                    onChangeText={(v) => setAbout(v)}
                    multiline
                    numberOfLines={5}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        fontFamily: 'outfit-medium',
                        borderColor: Colors.primary,
                        height: 100
                    }}
                />
                <View style={{
                    padding: 3,
                    borderWidth: 1,
                    borderRadius: 5,
                    fontSize: 17,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    fontFamily: 'outfit-medium',
                    borderColor: Colors.primary,
                }}>
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value)}
                        items={categoryList}
                    />
                </View>
            </View>

            <TouchableOpacity
                disabled={loading}
                onPress={() => onAddNewBusiness()}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 5,
                    marginTop: 20
                }}>
                {loading ?
                    <ActivityIndicator size={'large'} color={'#fff'} /> :
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'outfit-medium',
                        color: '#fff'
                    }}>Add New Business</Text>}
            </TouchableOpacity>
        </View>
    )
}