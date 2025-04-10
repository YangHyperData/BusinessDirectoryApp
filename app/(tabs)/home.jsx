import { View, Text, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'
import { auth } from '../../configs/FireBaseConfig';
export default function home() {

  const user = auth.currentUser;
  // console.log(user, 123)
  return (
    <ScrollView>

      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Category />
      {/* Popular Business List */}
      <PopularBusiness />

      <View style={{ height: 100 }}></View>
    </ScrollView>
  )
}