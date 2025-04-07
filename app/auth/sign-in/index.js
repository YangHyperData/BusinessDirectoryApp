import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../../configs/FireBaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const OnSignIn = async () => {

        if (!email && !password) {
            ToastAndroid.show('Please Enter Email & Password', ToastAndroid.LONG)
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    router.replace('/home'); // Navigate to home page
                } else {
                    ToastAndroid.show('Authentication failed, please try again.', ToastAndroid.LONG);
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
                if (errorCode == 'auth/invalid-credential') {
                    ToastAndroid.show("Invalid credentials", ToastAndroid.LONG)
                }
            });
    }

    return (
        <View style={{
            padding: 25,
            marginTop: 30,
            backgroundColor: Colors.white,
            height: "100%"
        }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                marginTop: 30
            }}>Let's Sign You In</Text>

            <Text style={{
                fontFamily: 'outfit',
                fontSize: 30,
                color: Colors.gray,
                marginTop: 20
            }}>Welcome Back</Text>

            <Text style={{
                fontFamily: 'outfit',
                fontSize: 30,
                color: Colors.gray,
                marginTop: 20
            }}>You've been missed!</Text>
            {/* Email */}
            <View style={{
                marginTop: 50
            }}>
                <Text
                    style={{
                        fontFamily: 'outfit'
                    }}>Email</Text>
                <TextInput onChangeText={(value) => setEmail(value)} placeholder='Enter Email' style={styles.input}></TextInput>
            </View>
            {/* Password */}
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Password</Text>
                <TextInput onChangeText={(value) => setPassword(value)} placeholder='Enter Password' style={styles.input} secureTextEntry={true}></TextInput>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity onPress={OnSignIn} style={{
                padding: 20,
                backgroundColor: Colors.primary,
                borderRadius: 15,
                marginTop: 50
            }}>
                <Text style={{
                    color: Colors.white,
                    textAlign: 'center'
                }}>Sign In</Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity
                onPress={() => router.replace('auth/sign-up')}
                style={{
                    padding: 20,
                    backgroundColor: Colors.white,
                    borderRadius: 15,
                    marginTop: 20,
                    borderWidth: 1
                }}>
                <Text style={{
                    color: Colors.primary,
                    textAlign: 'center'
                }}>Create Account</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.gray,
        fontFamily: 'outfit'
    }
})
