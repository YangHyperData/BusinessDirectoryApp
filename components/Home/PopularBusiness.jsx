import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import PopularBusinessCard from './PopularBusinessCard'
export default function PopularBusiness() {

    const [businessList, setBusinessList] = useState([]);
    useEffect(() => {
        GetBusinessList();
    }, [])

    const GetBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), limit(10));
        const querySnapShot = await getDocs(q);

        const filteredBusinesses = querySnapShot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(business => 
                ['CellPhones', 'Showroom GearVN', 'Highland Coffee'].includes(business.name)
            );

        setBusinessList(filteredBusinesses);
    };

    return (
        <View>
            <View style={{
                paddingTop: 20,
                paddingLeft:20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 1,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',

                }}>Popular Business
                </Text>
                <Text style={{
                    color: Colors.primary,
                    fontFamily: 'outfit-medium',
                    marginRight:20
                }}>View All</Text>
            </View>

            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <PopularBusinessCard 
                    business={item}
                    key={index}
                    />
                )}
            />
        </View>
    )
}