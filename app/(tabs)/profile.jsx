import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {

  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontSize:40,
        fontFamily:'outfit-bold'
      }}>profile</Text>

      <View>
        {/* User Infor */}
        <UserIntro/>
        {/* Menu List */}
        <MenuList/>

      </View>
    </View>
  )
}