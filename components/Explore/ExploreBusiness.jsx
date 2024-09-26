import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusiness({ businessList }) {

    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <FlatList
                data={businessList}
                contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
                renderItem={({ item, index }) => (
                    <View>
                        <BusinessListCard key={index} business={item} />
                    </View>
                )}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />
            <View style={{
                height:100
            }}>

            </View>
        </ScrollView>
    )
}