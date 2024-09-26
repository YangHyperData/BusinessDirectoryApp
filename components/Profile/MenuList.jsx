import { View, Text, FlatList, Image, TouchableOpacity, Share, Alert } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../configs/FireBaseConfig'
export default function MenuList() {

    const router = useRouter();
    const onMenuClick = (item) => {
        if (item.path == 'logout') {
            handleLogout();
            return;
        }
        if(item.path=='share'){
            Share.share({
                message:'DownLoad the Business Directory App by YangStone'
            });
            return;
        }
        router.push(item.path)
    }

    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: async () => {
                        try {
                            await auth.signOut();
                            router.replace('/Login');

                        } catch (error) {
                            console.error("Logout error: ", error);
                            Alert.alert("Error", "Failed to log out. Please try again.");
                        }
                    }
                }
            ]
        );
    };
    const MenuList = [
        {
            id: 1,
            name: 'Add\nBusiness',
            icon: require('./../../assets/images/add.png'),
            path: '/business/add-business'
        },
        {
            id: 2,
            name: 'My\nBusiness',
            icon: require('./../../assets/images/mybusiness.png'),
            path: '/business/my-business'
        },
        {
            id: 3,
            name: 'Share',
            icon: require('./../../assets/images/share1.png'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Log Out',
            icon: require('./../../assets/images/logout.png'),
            path: 'logout'
        }
    ]

    return (
        <View style={{
            marginTop: 50
        }}>
            <FlatList
                data={MenuList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => onMenuClick(item)}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            flex: 1,
                            padding: 10,
                            borderRadius: 15,
                            borderWidth: 1,
                            margin: 10,
                            backgroundColor: '#fff',
                            borderBlockColor: Colors.primary
                        }}>
                        <Image source={item.icon}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 19,
                            flex: 1
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}

            />
            <Text style={{
                fontFamily: 'outfit-bold',
                textAlign: 'center',
                marginTop: 80,
                fontSize: 20,
                color: Colors.gray
            }}>Developed By @YangStone 2024</Text>
        </View>
    )
}