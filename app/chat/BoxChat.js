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
    Platform
} from 'react-native';
import Sender from './Component/Sender';
import Receiver from './Component/Receiver';
import { auth } from '../../configs/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoxChat = () => {
    const [emailBusi, setEmailBusi] = useState('');
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', type: 'receiver', text: 'Xin chào!' },
        { id: '2', type: 'sender', text: 'Chào bạn! Bạn khỏe không?' },
        { id: '3', type: 'receiver', text: 'Mình khỏe, cảm ơn. Còn bạn?' },
        { id: '4', type: 'sender', text: 'Cũng ổn luôn!' },
    ]);

    const user = auth.currentUser;

    useEffect(() => {
        const saveData = async () => {
            try {
                const email = await AsyncStorage.getItem('data');
                if (email) {
                    setEmailBusi(email);
                    console.log("user pussyness", email);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
            }
        };

        saveData();

        if (user) {
            console.log("user của chính mình", user.email);
        }
    }, []);


    const chatId = () => {
        let str = emailBusi
        setEmailBusi(str.replace(/"/g, ''))
        return (
            user.email < emailBusi
                ? `${user.email}_${emailBusi}`
                : `${emailBusi}_${user.email}`)
    }


    const handleSend = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            type: 'sender',
            text: inputText.trim(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
    };

    const renderItem = ({ item }) => {
        return item.type === 'sender' ? (
            <Sender text={item.text} />
        ) : (
            <Receiver text={item.text} />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Nguyễn Văn A</Text>
            </View>

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageContainer}
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
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: '#0084ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default BoxChat;
