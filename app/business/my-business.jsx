import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../configs/FireBaseConfig'
import { db } from '../../configs/FireBaseConfig'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import BusinessListCard from '../../components/Explore/BusinessListCard';
import { useNavigation } from 'expo-router';
export default function MyBusiness() {
    const user = auth.currentUser;
    const fullName = user?.email;
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business'
        })
        user && GetUserBusiness();
    }, [user])


    const GetUserBusiness = async () => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList')
            , where('username', '==', fullName));

        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            console.log((doc.data()));
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
        })
        setLoading(false)
    }
    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30
            }} >My Business</Text>

            <FlatList
                data={businessList}
                onRefresh={GetUserBusiness}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <BusinessListCard business={item}
                        key={index}
                    />
                )}
            />
        </View>
    )
}