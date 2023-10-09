import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal, Pressable, ImageBackground } from 'react-native';
import { Layout, InputV1, ButtonV1 } from "./Function";

const image = { uri: 'https://cdn-icons-png.flaticon.com/512/64/64096.png' };
const imageAdd = { uri: 'https://imgpng.ru/d/plus_PNG110.png' };


export const UserScreen = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = React.useState(true)
    const [newUser, setNewUsers] = React.useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalName, setmodalName] = useState("")
    const [modalSerName, setmodalSerName] = useState("")
    const [modalId, setmodalId] = useState("")
    const [modalEmail, setmodalEmail] = useState("")

    const [filteredData, setFilteredData] = useState(null)

    const buttonDisabledModal = (!(
        modalSerName.trim() !== "" &&
        modalName.trim() !== "" &&
        modalId.trim() !== "" &&
        modalEmail.trim() !== ""))

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData.data);
                setFilteredData(responseData.data)
                setLoading(false);
                setError(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                setError(true);
            });
    }, []);

    const onPresNavigate = (user) => {
        navigation.navigate('InfoScreen', { user });
    }

    const deleteUser = (userId) => {
        const removeUser = data.filter((user) => user.id !== userId);
        setData(removeUser);
        setFilteredData(removeUser)
    }

    const onFilterTextChange = (text) => {
        const filteredUsers = data.filter((user) =>
            user.first_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filteredUsers)
        setNewUsers(text)
    };

    const addNewUSer = () => {
        if (
            modalSerName.trim() !== "" &&
            modalName.trim() !== "" &&
            modalId.trim() !== "" &&
            modalEmail.trim() !== ""
        ) {
            const newUserObj = {
                id: modalId,
                first_name: modalName,
                last_name: modalSerName,
                email: modalEmail,



            };

            setData((prevData) => {
                const newData = [...prevData];
                newData.unshift(newUserObj);
                return newData;
            });

            setFilteredData((prevData) => {
                const newData = [...prevData];
                newData.unshift(newUserObj);
                return newData;
            });

            setmodalName("");
            setmodalSerName("");
            setmodalId("");
            setmodalEmail("");
            setModalVisible(false);
        }
    };


    if (loading) {
        return (
            <Layout style={styles.loadingBlock}>
                <Text style={styles.textLoading}>Loading...</Text>
            </Layout>
        );
    }
    if (!data) {
        return (
            <Layout style={styles.loadingBlock}>
                <Text>The data did not arrive...</Text>
            </Layout>
        );
    }

    return (
        <Layout style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.modalBody}>
                    <View style={styles.containerModal}>
                        <InputV1
                            style={styles.modalInputname}
                            placeholder={"ИМЯ"}
                            value={modalName}
                            onChangeText={(text) => setmodalName(text)}
                        />
                        <InputV1
                            style={styles.modalInputname}
                            placeholder={"ФАМИЛИЯ"}
                            value={modalSerName}
                            onChangeText={(text) => setmodalSerName(text)}
                        />
                        <InputV1
                            style={styles.modalInputname}
                            placeholder={"ID"}
                            value={modalId}
                            onChangeText={(text) => setmodalId(text)}
                        />
                        <InputV1
                            style={styles.modalInputname}
                            placeholder={"EMAIL"}
                            value={modalEmail}
                            onChangeText={(email) => setmodalEmail(email)}
                        />
                        <ButtonV1
                            style={styles.buttonModal}
                            title={"ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ"}
                            onPress={() => addNewUSer()}
                            disabled={buttonDisabledModal}
                        />
                    </View>
                    <Pressable
                        style={styles.signIn}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>ВЫЙТИ</Text>
                    </Pressable>
                </View>
            </Modal>
            <View style={styles.addUser_block}>
                <InputV1
                    style={styles.addUser_input}
                    placeholder={"ПОИСК"}
                    value={newUser}
                    onChangeText={(text) => onFilterTextChange(text)}
                />
                <TouchableOpacity style={styles.addUser_button} onPress={() => setModalVisible(true)}>
                    <ImageBackground source={imageAdd} resizeModce="cover" style={styles.imageAdd}></ImageBackground>
                </TouchableOpacity>

            </View>
            <View
                style={{
                    borderRadius: 10,
                    padding: 10,
                    flex: 1,
                    backgroundColor: '#F4F2DE',
                }}
            >
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.containerUser}>
                            <TouchableOpacity
                                key={item.id}
                                style={styles.userItem}
                                onLongPress={() => deleteUser(item.id)}
                                onPress={() => onPresNavigate(item)}
                            >
                                <Text style={styles.textSize}>
                                    {item.first_name} {item.last_name}
                                </Text>
                                <View style={styles.avatarContainer}>
                                    <ImageBackground source={image} resizeModce="cover" style={styles.image}>
                                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )}
                    contentContainerStyle={{
                        gap: 20,
                    }}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    imageAdd: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#A1CCD1',
        padding: 20,
    },
    image: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerUser: {
        marginRight: 20,
    },
    addUser_block: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    addUser_input: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F4F2DE'
    },
    addUser_button: {
        justifyContent: "center",
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#F4F2DE',
        borderRadius: 25,
    },
    userItem: {
        borderRadius: 10,
        backgroundColor: '#E9B384',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    avatarContainer: {
        width: 85,
        height: 85,
        borderRadius: 40,
        backgroundColor: '#7C9D96',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: "relative",
    },
    containerModal: {
        backgroundColor: "#F4F2DE",
        gap: 20,
    },
    signIn: {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',

    },
    modalInputname: {
        backgroundColor: '#E9B384',
        padding: 10,
        borderRadius: 10,
        color: '#F4F2DE',

    },
    textStyle: {
        color: '#F4F2DE',
        fontWeight: 'bold'

    },
    buttonModal: {
        backgroundColor: '#A1CCD1',
        padding: 10,
        borderRadius: 10,
        color: '#F4F2DE',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBody: {
        padding: 40,
        flex: 1,
        backgroundColor: '#F4F2DE',
        justifyContent: 'space-around'
    },
    textSize: {
        width: 150,
    },
    loadingBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLoading: {
        fontSize: 42,
        color: 'green'
    }
});
