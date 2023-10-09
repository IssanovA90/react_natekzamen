import { Layout } from "./Function"
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React from 'react';


const image = { uri: 'https://cdn-icons-png.flaticon.com/512/64/64096.png' };


export const InfoScreen = ({ route }) => {

    const { user } = route.params;


    return (
        <Layout style={styles.infoContainer}>
            <View style={styles.avaContainer} >
                <View style={styles.infoAvatar}>
                    <ImageBackground source={image} resizeModce="cover" style={styles.imagess}>
                        <Image source={{ uri: user.avatar }} style={styles.ava} />
                    </ImageBackground>
                </View>
                <Text style={styles.infoName}>{user.id} </Text>
                <Text style={styles.infoName}>{user.first_name} {user.last_name}</Text>
                <Text style={styles.infoEmail}>{user.email}</Text>
            </View>
            <View style={styles.mediaContainer}>
                <View style={styles.media}>
                    <Image style={{ width: 32, height: 32, }} source={require('../img/face.png')}></Image>
                    <Image style={{ width: 32, height: 32, }} source={require('../img/insta.png')}></Image>
                    <Image style={{ width: 32, height: 32, }} source={require('../img/link.png')}></Image>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#A1CCD1',
        justifyContent: 'space-between',
    },
    avaContainer: {
        marginTop: 60,
        alignItems: 'center',
        gap: 30,
    },
    infoAvatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#F4F2DE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ava: {
        width: 130,
        height: 130,
        borderRadius: 65,
    },
    infoName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#F4F2DE'
    },
    infoEmail: {
        fontSize: 22,
        color: '#F4F2DE'
    },
    mediaContainer: {
        alignItems: 'flex-end'
    },
    media: {
        flexDirection: "row",
        gap: 5,
    },
    imagess: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    }
})