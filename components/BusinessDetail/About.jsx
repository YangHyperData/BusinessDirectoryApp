import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'#fff',
        
    }}>
      <Text
      style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}
      >About</Text>
      <Text
      style={{
        fontFamily:'outfit-medium',
        lineHeight:25
      }}
      >{business?.about}</Text>
    </View>
  )
}