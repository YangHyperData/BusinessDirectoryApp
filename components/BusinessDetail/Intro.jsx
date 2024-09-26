import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { auth } from '../../configs/FireBaseConfig';

export default function Intro({ business }) {

    const router = useRouter();
    const user = auth.currentUser;
    const fullName = user?.email;
    const OnDelete = () => {
        Alert.alert('Do you want to Delete?', 'Do you want to Delete this business?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteBusiness()
            }
        ])
    }

    const deleteBusiness = async () => {
        console.log("Delete Business");
        await deleteDoc(doc(db, "BusinessList", business?.id))
        router.back();
        ToastAndroid.show("Deleted Business!",ToastAndroid.LONG)
    }
    return (
        <View>
            <View
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 20
                }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>

                <Ionicons name="heart-outline" size={40} color="white" />
            </View>
            <Image source={{ uri: business?.imageURL }}
                style={{
                    width: '100%',
                    height: 300
                }}
            />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingTop: 20,
                paddingRight: 20,
                marginTop: -20,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
            }}>
                <View style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: -20,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                }}>
                    <Text style={{
                        fontSize: 26,
                        fontFamily: 'outfit-bold',
                    }}>
                        {business?.name}

                    </Text>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 18
                    }}>
                        {business?.address}
                    </Text>
                </View>
                {user?.email==business?.username&&<TouchableOpacity
                    onPress={() => OnDelete()}
                >
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}