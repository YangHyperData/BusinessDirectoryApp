import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'
export default function CategoryItem({ category,OnCategoryPress }) {
    return (
        <View>
            <TouchableOpacity onPress={()=> OnCategoryPress(category)}
            style={{
                padding:10,
                backgroundColor:Colors.bgicon,
                borderRadius:99,
                marginRight:15
            }}
            >
                <Image source={{ uri: category.icon }}
                    style={{
                        width: 40,
                        height: 40,
                        alignSelf:'center'
                    }}
                />
            </TouchableOpacity>
            <Text style={{
                fontSize:12,
                fontFamily:'outfit-medium',
                textAlign:'center',
                marginTop:5,
                marginRight:15
            }}>{category.name}</Text>
        </View>
    )
}