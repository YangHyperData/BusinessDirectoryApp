import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors'
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FireBaseConfig'
import ExploreBusiness from '../../components/Explore/ExploreBusiness';
export default function explore() {

  const [businessList, setBusinessList] = useState([]);

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(collection(db, 'BusinessList'), where('category', '==', category));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }])
    })
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit-bold',
        padding: 10
      }}>Explore More</Text>

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
      {/* Category */}
      <Category

        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />
      {/* Business List */}
      <ExploreBusiness businessList={businessList} />


    </View>
  )
}