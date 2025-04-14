import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../configs/FireBaseConfig';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to fetch documents in real-time
const fetchCollectionDocuments = (collectionName, callback) => {
    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        callback(documents);
    });

    return unsubscribe;
};

const Inbox = () => {
    const [documents, setDocuments] = useState([]);
    const user = auth.currentUser;
    const email = user.email;
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = fetchCollectionDocuments('Chats', (data) => {
            // Lọc các documents có chứa email trong tên
            const filteredData = data.filter(doc => doc.id.toLowerCase().includes(email.split('@')[0].toLowerCase()));
            setDocuments(filteredData);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    const handleChatPress = async (chatId) => {
        // Lấy email của người nhận từ chatId
        const currentUserName = email.split('@')[0].toLowerCase();
        const otherUserName = chatId.replace(currentUserName, '');

        // Tạo email của người nhận bằng cách thêm domain
        const otherUserEmail = `${otherUserName}@gmail.com`;

        // Lưu email người nhận vào AsyncStorage
        await AsyncStorage.setItem('data', JSON.stringify(otherUserEmail));

        // Navigate to BoxChat
        router.push('/chat/BoxChat');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleChatPress(item.id)}
        >
            <Text style={styles.title}>{item.id}</Text>
            <Text style={styles.lastMessage}>
                {item.lastMessage || 'Start a conversation'}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chats</Text>
            <FlatList
                data={documents}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontFamily: 'outfit-bold',
        marginBottom: 20,
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontFamily: 'outfit-medium',
        marginBottom: 5,
    },
    lastMessage: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'outfit',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default Inbox;