import { Layout, InputV1, ButtonV1 } from "./Function";
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';

export const RegistrsationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const buttonDisabledRegistration = (!(
        email.trim() !== "" &&
        password.trim() !== ""))


    const sigIn = () => {
        navigation.navigate('UserScreen');
        setEmail('')
        setPassword('')
    }

    return (
        <Layout style={styles.contain}>
            <InputV1
                style={styles.input}
                placeholder={"EMAIL"}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <InputV1
                style={styles.input}
                placeholder={"PASSWORD"}
                value={password}
                onChangeText={(email) => setPassword(email)}
            />
            <ButtonV1
                style={styles.sigInButton}
                title={"ВОЙТИ"}
                onPress={() => sigIn()}
                disabled={buttonDisabledRegistration}
            />
        </Layout>
    )
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        padding: 70,
        gap: 20,
        backgroundColor: '#A1CCD1',
    },
    input: {
        padding: 10,
        backgroundColor: '#F4F2DE',
        borderRadius: 10,
    },
    sigInButton: {
        backgroundColor: '#E9B384',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10,
        height: 50,
        fontWeight: 'bold',
    },
})