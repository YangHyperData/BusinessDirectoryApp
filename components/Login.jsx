import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../constants/Colors'
import { useRouter } from 'expo-router'


export default function LoginScreen() {
    const router=useRouter();
    return (
        <View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 50
            }}>
                <Image source={require('./../assets/images/login.png')}
                    style={{
                        width: 220,
                        height: 450,
                        borderRadius: 20,
                        borderWidth: 6,
                        borderColor: '#000'
                    }}
                />
            </View>

            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                    textAlign: 'center'
                }}>Your Ultimate
                    <Text style={{
                        color: Colors.primary,

                    }}> Community Business Directory</Text> App</Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.gray
                }}>Find your favorite business and post your own business to your community</Text>
                <TouchableOpacity style={styles.btn} onPress={() => router.push('auth/sign-in')} >
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: 'outfit',
                    }}>Let's get started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: -20,
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 16,
        marginTop: 20,
        borderRadius: 99
    }
})
