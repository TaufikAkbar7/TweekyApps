import React, { useState } from 'react'
import { View, TouchableOpacity, Pressable, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(true);

    const onSubmit = async () => {
        try {
            auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('TabScreen', { screen: 'Home' }))
            .catch((err => {
                switch(err.code) {
                    case 'auth/invalid-email':
                        alert('email address is not valid')
                        break;
                    case 'auth/user-disabled':
                        alert('email has been disabled')
                        break;
                    case 'auth/user-not-found':
                        alert('user not found')
                        break;
                    case 'auth/wrong-password':
                        alert('password is invalid, try again')
                        break;
                }
            }))

            // let dataAkun = {
            //     email: email,
            //     password: password
            // }
            // await AsyncStorage.setItem('akun', JSON.stringify(dataAkun))
        } catch (error) {
            console.log(error)
        }
    }

    // const onLogout = async () => {
    //     try {
    //         await AsyncStorage.removeItem('akun')
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     alert('logout')
    // }

    // const getData = async () => {
    //     try {
    //         await AsyncStorage.getItem('akun')
    //         .then(response => {
    //             return response != null ? JSON.parse(response) : null
    //         })
            
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [])

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
                        flex: 0.7,
                        padding: 5,
                        justifyContent: 'center',
                        // alignItems: 'center'
                    }}>
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
                                placeholder="********"
                                secureTextEntry={show}
                                value={password}
                                disabledInputStyle={{ background: "#ddd" }}
                                rightIcon={(
                                    <TouchableOpacity onPress={() => setShow(!show)}>
                                        <MaterialIcons name={!show ? 'visibility' : 'visibility-off'} size={25} />
                                    </TouchableOpacity>
                                )}
                                onChangeText={e => setPassword(e)}
                                labelStyle={{
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}
                            />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Pressable onPress={onSubmit}>
                                <View style={{
                                    backgroundColor: "#1D9BF0",
                                    padding: 5,
                                    paddingVertical: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Login</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text style={{
                                color: '#5C636E',
                                fontSize: 12,
                                fontFamily: 'Roboto-Light'
                            }}>
                                Don't have an Account?</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Pressable onPress={() => navigation.navigate('Register')}>
                                <View>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        fontFamily: 'Poppins-Light'
                                    }}>
                                        Register Now</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default LoginScreen
