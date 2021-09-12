import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);

    const empty = () => {
        if (
          email === '' ||
          pass === '' ||
          pass1 === '' ||
          username === '' ||
          name === ''
        ) {
          return true;
        } else {
          return false;
        }
      };

    const onSubmit = () => {

        if (password != confirmPassword) {
            alert('confirm password not match!');
        } else {
            auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firestore().collection('user').doc(auth().currentUser.uid)
                        .set({
                            name,
                            username,
                            email,
                            password
                        })
                })
                .catch(err => {
                    if (err.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                })
            navigation.navigate("Login")
        }
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
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default RegisterScreen
