import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from './../../constants/Colors'

export default function BusinessListByCategory() {

    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [loading, setLoading] = useState(false)
    const [businessList, setBusinessList] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        })
        getBusinessList();
    }, []);

    // Use to get BusinessList by category
    const getBusinessList = async () => {
        setLoading(true);
        const q = query(collection(db, 'BusinessList'), where("category", '==', category));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((docs) => {
            console.log(docs.data());
            setBusinessList(prev => [...prev, {id:docs?.id, ...docs.data()}])
        })
        setLoading(false);
    }
    return (
        <View>

            {businessList?.length > 0 && loading == false ?
                <FlatList
                    data={businessList}
                    refreshing={loading}
                    renderItem={({ item, index }) => (
                        <BusinessListCard
                            business={item}
                            key={index}
                        />
                    )}
                /> :
                loading==true?<ActivityIndicator
                style={{
                    marginTop:'60%'
                }}
                size={'large'}
                color={Colors.primary}
                />:
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'outfit-bold',
                        color: Colors.gray,
                        textAlign: 'center',
                        marginTop: '50%'
                    }}
                >No Business Found</Text>
            }

        </View>
    )
}