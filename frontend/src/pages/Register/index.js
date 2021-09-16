import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { register } from '../../config/redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, user } = userRegister;
    const dispatch = useDispatch();

    const empty = () => {
        if (
            email === '' ||
            password === '' ||
            confirmPassword === '' ||
            username === '' ||
            name === ''
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onSubmit = () => {
        dispatch(register(name, username, email, password))
        navigation.navigate("Login")
    }

    return (
        <SafeAreaProvider>
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#F6F6F6',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {loading ? (
                        <Text>loading...</Text>
                    ) : error ? (
                        <Text>{error}</Text>
                    ) : (
                        <>
                            <View style={{
                                width: 340,
                                // backgroundColor: 'blue',
                                padding: 5,
                            }}>
                                <View>
                                    <Input
                                        label="Username"
                                        // errorMessage="Oops! that's not correct."
                                        placeholder="Enter Username"
                                        disabledInputStyle={{ background: "#ddd" }}
                                        onChangeText={e => setUsername(e)}
                                        value={username}
                                        labelStyle={{
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </View>
                                <View>
                                    <Input
                                        label="Name"
                                        // errorMessage="Oops! that's not correct."
                                        placeholder="Enter Name"
                                        disabledInputStyle={{ background: "#ddd" }}
                                        onChangeText={e => setName(e)}
                                        value={name}
                                        labelStyle={{
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </View>
                                <View>
                                    <Input
                                        label="Email"
                                        // errorMessage="Oops! that's not correct."
                                        placeholder="Enter Email"
                                        disabledInputStyle={{ background: "#ddd" }}
                                        onChangeText={e => setEmail(e)}
                                        value={email}
                                        labelStyle={{
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </View>
                                <View>
                                    <Input
                                        label="Password"
                                        // errorMessage="Oops! that's not correct."
                                        placeholder="Enter Password"
                                        placeholder="********"
                                        secureTextEntry={show}
                                        disabledInputStyle={{ background: "#ddd" }}
                                        onChangeText={e => setPassword(e)}
                                        value={password}
                                        labelStyle={{
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                        rightIcon={(
                                            <TouchableOpacity onPress={() => setShow(!show)}>
                                                <MaterialIcons name={!show ? 'visibility' : 'visibility-off'} size={25} />
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                                <View>
                                    <Input
                                        label="Confirm Password"
                                        // errorMessage="Oops! that's not correct."
                                        placeholder="Enter Confirm Password"
                                        placeholder="********"
                                        secureTextEntry={show1}
                                        disabledInputStyle={{ background: "#ddd" }}
                                        onChangeText={e => setConfirmPassword(e)}
                                        value={confirmPassword}
                                        labelStyle={{
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                        rightIcon={(
                                            <TouchableOpacity onPress={() => setShow1(!show1)}>
                                                <MaterialIcons name={!show1 ? 'visibility' : 'visibility-off'} size={25} />
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                                <View style={{ padding: 10 }}>
                                    <Pressable onPress={() => onSubmit()} disabled={empty()}>
                                        <View style={{
                                            backgroundColor: "#1D9BF0",
                                            padding: 5,
                                            paddingVertical: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Register</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default RegisterScreen
