import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { auth } from './../../configs/FireBaseConfig'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
    const user = auth.currentUser;
    const fullName = user?.email;
    return (
        <View style={{
            padding: 20,
            paddingTop: 28,
            backgroundColor: Colors.primary,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <Image source={require('./../../assets/images/avt.jpg')}
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 45
                    }} />
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 19
                        , color: Colors.white
                    }}>Welcome,</Text>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 19
                        , color: Colors.white
                    }}>{fullName}</Text>
                </View>
            </View>
            {/* Search Bar */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                backgroundColor: Colors.white,
                padding: 7,
                marginTop: 13,
                borderRadius: 8
            }}>
                <Ionicons name="search" size={24} color={Colors.primary} />
                <TextInput placeholder='Search...'
                    style={{
                        fontSize: 16,
                        fontFamily: 'outfit',
                        alignItems: 'center'
                    }} />
            </View>
        </View>
    )
}