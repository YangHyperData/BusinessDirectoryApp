import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import Sender from './Component/Sender';
import Receiver from './Component/Receiver';
import { auth, db } from '../../configs/FireBaseConfig';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoxChat = () => {
    const [emailBusi, setEmailBusi] = useState('');
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatId, setChatId] = useState('');

    const user = auth.currentUser;

    const sanitizeEmail = (email) => {
        return email.replace(/[.#$[\]]/g, '_');
    };

    useEffect(() => {
        const saveData = async () => {
            try {
                if (!user) {
                    console.error('User not authenticated');
                    setLoading(false);
                    return;
                }

                const email = await AsyncStorage.getItem('data');
                if (!email) {
                    console.error('No email found in AsyncStorage');
                    setLoading(false);
                    return;
                }

                const cleanEmail = sanitizeEmail(email.replace(/"/g, '').trim());
                if (!cleanEmail || !cleanEmail.includes('@')) {
                    console.error('Invalid email format');
                    setLoading(false);
                    return;
                }

                setEmailBusi(cleanEmail);

                // Extract usernames (parts before @) from both emails
                const currentUserName = user.email.split('@')[0];
                const businessUserName = cleanEmail.split('@')[0];

                // Create chat ID using only the usernames
                const id = currentUserName < businessUserName
                    ? `${currentUserName}_${businessUserName}`
                    : `${businessUserName}_${currentUserName}`;
                setChatId(id);
                setChatId(id);

                const messagesRef = collection(db, `Chats/${id}/messages`);
                const q = query(messagesRef, orderBy('timestamp'));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const messageList = snapshot.docs.map(doc => doc.data());
                    setMessages(messageList);
                    setLoading(false);
                });

                return () => {
                    unsubscribe();
                };

            } catch (error) {
                console.error('Error initializing chat:', error);
                setLoading(false);
            }
        };

        saveData();
    }, []);

    const handleSend = async () => {
        if (inputText.trim() === '' || !chatId) {
            console.error('Invalid input or chat ID');
            return;
        }

        const newMessage = {
            id: Date.now().toString(),
            senderEmail: user.email,
            text: inputText.trim(),
            timestamp: Date.now()
        };

        try {
            const messagesRef = collection(db, `Chats/${chatId}/messages`);
            await addDoc(messagesRef, newMessage);
            setInputText('');
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    const renderItem = ({ item }) => {
        return item.senderEmail === user.email ? (
            <Sender text={item.text} />
        ) : (
            <Receiver text={item.text} />
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0084ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{emailBusi}</Text>
            </View>

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageContainer}
                inverted={false}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập tin nhắn..."
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        disabled={!inputText.trim()}
                    >
                        <Text style={styles.sendText}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    messageContainer: {
        padding: 10,
        paddingBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: '#0084ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default BoxChat;