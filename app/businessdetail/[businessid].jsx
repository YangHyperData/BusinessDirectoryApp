import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { Colors } from './../../constants/Colors'
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';
import { auth } from './../../configs/FireBaseConfig'
export default function BusinessDetail() {
    const router = useRouter();

    const { businessid } = useLocalSearchParams();
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        GetBusinessDetailById();
    }, [])

    // Use to get BusinessDetail By ID
    const GetBusinessDetailById = async () => {
        setLoading(true);
        const docRef = doc(db, 'BusinessList', businessid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data: ", docSnap.data());
            setBusiness({ id: docSnap.id, ...docSnap.data() });
            setLoading(false)
        }
        else {
            console.log("No such document");
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            {loading ?
                <ActivityIndicator
                    size={'large'}
                    style={{
                        marginTop: '70%'
                    }}
                    color={Colors.primary}
                /> :
                <View>
                    {/* Intro */}

                    <Intro business={business} />

                    {/* Action Button */}
                    <ActionButton business={business} router={router} />

                    {/* About Section */}

                    <About business={business} />

                    {/* Reviews Section */}

                    <Reviews business={business} />
                </View>
            }
        </ScrollView>
    )
}