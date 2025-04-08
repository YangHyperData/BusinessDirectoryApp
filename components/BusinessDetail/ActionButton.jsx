import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function ActionButton({ business, router }) {
    

    const ActionButtonMenu = [
        {
            id: 1,
            name: "Call",
            icon: require('./../../assets/images/call.png'),
            url: 'tel:' + business?.contact
        },
        {
            id: 2,
            name: "Location",
            icon: require('./../../assets/images/location.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: "Web",
            icon: require('./../../assets/images/web.png'),
            url: business?.website
        },
        {
            id: 4,
            name: "Share",
            icon: require('./../../assets/images/share.png'),
            url: business?.website
        },
        {
            id: 5,
            name: "Chat",
            icon: require('./../../assets/images/chat.png'),
            url: business?.website
        },
    ];

    const OnPressHandle = (item) => {
        if (item.name === 'Share') {
            Share.share({
                message: `${business?.name}\nAddress: ${business?.address}\nFind more details on the Business Directory App by YangStone!`
            });
            return;
        }
        if (item.name === 'Chat') {
            router.push({
                pathname: '/chat/BoxChat',
                params: {
                    id: business?.id,
                    name: business?.name,
                    image: business?.imageURL,
                },
            });
            return;
        }
        Linking.openURL(item.url);
    };

    return (
        <View style={{
            backgroundColor: '#fff',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 5
        }}>
            <FlatList
                data={ActionButtonMenu}
                horizontal={true}
                contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index}
                        onPress={() => OnPressHandle(item)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                    >
                        <Image
                            source={item?.icon}
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                        <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center', marginTop: 3 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
