import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'
export default function Category({ explore = false, onCategorySelect }) {

    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
    useEffect(() => {
        GetCategoryList();
    }, [])

    const GetCategoryList = async () => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            // console.log(doc.data());
            setCategoryList(prev => [...prev, doc.data()])
        })
    }

    const onCategoryPressHandler = (item) => {
        if (!explore) {
            router.push('/businesslist/' + item.name)
        }
        else {
            onCategorySelect(item.name);
        }
    }

    return (
        <View>
            {!explore && <View style={{
                paddingTop: 10,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 1,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',

                }}>Category
                </Text>
                <Text style={{
                    color: Colors.primary,
                    fontFamily: 'outfit-medium',
                    marginRight: 20
                }}>View All</Text>
            </View>
            }
            <FlatList
                data={categoryList}
                horizontal={true}
                style={{ marginLeft: 20 }}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) => (
                    <CategoryItem
                        category={item}
                        key={index}
                        OnCategoryPress={(category) => onCategoryPressHandler(item)}
                    />
                )}

            />
        </View>
    )
}