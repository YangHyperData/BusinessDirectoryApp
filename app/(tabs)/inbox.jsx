import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../configs/FireBaseConfig';


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

    return unsubscribe; // To stop listening, call this
};

const inbox = () => {
    const [documents, setDocuments] = useState([]);
    const user = auth.currentUser;
    const email = user.email;

    useEffect(() => {
        const unsubscribe = fetchCollectionDocuments('Chats', (data) => {
            // Lọc các documents có chứa email trong tên
            const filteredData = data.filter(doc => doc.id.toLowerCase().includes(email.split('@')[0].toLowerCase()));
            setDocuments(filteredData);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.id}</Text>
            <Text>{JSON.stringify(item)}</Text>
        </View>
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
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    listContent: {
        paddingVertical: 10,
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default inbox;
