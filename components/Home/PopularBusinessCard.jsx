import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors'
import { useRouter } from 'expo-router';
export default function PopularBusinessCard({ business }) {

    const address = business?.address || '';
    const midPoint = Math.floor(address.length / 2);

    const firstPart = address.substring(0, midPoint);
    const secondPart = address.substring(midPoint);
    const router = useRouter()
    return (
        <TouchableOpacity
            onPress={() => router.push("/businessdetail/" + business.id)}
            style={{
                marginLeft: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#fff',
                borderRadius: 15,
                marginTop: 5
            }}>

            <Image
                source={{ uri: business?.imageURL }}
                style={{
                    width: 250,
                    height: 150,
                    borderRadius: 15
                }}
            />
            <View style={{
                marginTop: 7,
                gap: 5
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25,
                }} >{business.name}</Text>

                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 16,
                    color: Colors.gray,
                }}>
                    {firstPart}
                </Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 16,
                    color: Colors.gray,
                }}>
                    {secondPart}
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5
                    }}>
                        <Image source={require('./../../assets/images/star.png')}
                            style={{
                                width: 30,
                                height: 30,
                                marginTop: 10
                            }}
                        />

                        {/* <Text style={{
                            fontFamily: 'outfit',
                            marginTop: 7,
                            fontSize: 30
                        }}>4.5</Text> */}
                    </View>
                    <Text
                        style={{
                            fontFamily: 'outfit',
                            backgroundColor: Colors.primary,
                            padding: 3,
                            fontSize: 25,
                            borderRadius: 5,
                            color: '#fff',
                            marginTop: 5
                        }}>{business.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
