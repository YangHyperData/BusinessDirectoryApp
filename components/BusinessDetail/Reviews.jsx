import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Colors } from './../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { auth } from './../../configs/FireBaseConfig'
export default function Reviews({ business }) {
    // Check if business.reviews exists and is an array
    const reviews = Array.isArray(business?.reviews) ? business.reviews : [];

    const user = auth.currentUser;
    const fullName = user?.email;
    const [rating, setRating] = useState(5);
    const [userInput, setUserInput] = useState();

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business?.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: fullName,
            })
        });

        ToastAndroid.show('Review submitted!', ToastAndroid.BOTTOM);
    };

    return (
        <View style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#fff'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>Reviews</Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder='Write Your Comment'
                    numberOfLines={4}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.gray,
                        marginBottom: 20,
                        fontFamily: 'outfit-medium',
                        textAlignVertical: 'top'
                    }}
                />

                <TouchableOpacity
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.primary,
                        borderRadius: 15,
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        color: Colors.white,
                        textAlign: 'center'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Display Previous Section */}

            <View>
                {reviews.map((item, index) => (
                    <View 
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: Colors.gray,
                            borderRadius: 15,
                            marginTop: 10,
                            marginBottom: 10
                        }}>
                        <Image 
                            source={require('./../../assets/images/avt.jpg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 45
                            }} 
                        />
                        <View style={{ display: 'flex', gap: 5 }}>
                            <Text style={{ fontFamily: 'outfit-bold' }}>{item.userName}</Text>
                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={item.rating}
                                style={{
                                    alignItems: 'flex-start'
                                }}
                            />
                            <Text style={{ fontFamily: 'outfit-medium' }}>{item.comment}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
