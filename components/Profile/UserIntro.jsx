import { View, Text, Image } from 'react-native'
import React from 'react'
import {auth} from './../../configs/FireBaseConfig'
export default function UserIntro() {
    const user = auth.currentUser;
    const fullName = user?.email ;
    return (
        <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:20
        }}>
            <Image source={require('./../../assets/images/avt.jpg')}
                style={{
                    height: 150,
                    width: 150,
                    borderRadius: 45
                }} />
                <Text
                style={{
                    fontFamily:'outfit-bold',
                    fontSize:20
                }}
                >{fullName}</Text>
        </View>
    )
}