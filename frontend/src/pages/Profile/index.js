import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Card, BottomSheet, Input } from 'react-native-elements'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from "react-redux"
import { getUserProfile, listPostProfile } from '../../config/redux/actions'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Follow } from '../../components'

const ProfileScreen = ({ navigation, route }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const userProfile = useSelector((state) => state.userProfile)
    const userPostProfile = useSelector((state) => state.userPostProfile)
    const { user } = userProfile
    const { listUserPost, loading } = userPostProfile
    const { uid } = route.params
    const dispatch = useDispatch()

    const onSave = () => {
        try {
            firebase()
                .collection('user')
                .doc(auth().currentUser.uid)
                .update({
                    name: name,
                    bio: bio
                })
        } catch (error) {
            console.log(error)
        }
    }

    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem("UserData")
            auth().signOut()
            navigation.navigate("Login")
        } catch (error) {
            console.log(error)
        }
        alert('logout')
    }

    useEffect(() => {
        if (uid === auth().currentUser.uid) {
            //jika user yang login sama dengan params id
            //tampil profile user yang login
            dispatch(listPostProfile(uid))
            dispatch(getUserProfile(uid))
        } else {
            //jika user yang login tidak sama dengan params id
            //tampil profile user lain
            dispatch(listPostProfile(uid))
            dispatch(getUserProfile(uid))
        }
    }, [dispatch, uid])

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
                backgroundColor: '#F6F6F6',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {userPostProfile && user && listUserPost && listUserPost.length > 0 ? (
                    <ScrollView>
                        <View style={{ width: 360 }}>

                            <View style={{ height: 300 }}>
                                <View style={{ flex: 0.4 }}>
                                    <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{
                                        width: 360,
                                        height: 113,
                                    }} />
                                </View>
                                <View style={{ marginHorizontal: 10 }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                        top: 65,
                                        width: 340,
                                    }}>
                                        <Avatar size="large" rounded source={{ uri: 'https://source.unsplash.com/random' }} />
                                        <View style={{
                                            flexDirection: 'row',
                                            marginLeft: 80,
                                            width: 180,
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            {/* Component modal untuk edit profile */}
                                            <BottomSheet
                                                isVisible={isVisible}
                                                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                                            >
                                                <View style={{
                                                    backgroundColor: '#FFFFFF',
                                                    // height: 450,
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginHorizontal: 15,
                                                        marginTop: 10,
                                                    }}>
                                                        <TouchableOpacity onPress={onSave}>
                                                            <View style={{
                                                                padding: 5,
                                                                backgroundColor: "#1D9BF0",
                                                                paddingHorizontal: 15,
                                                                borderRadius: 10
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    color: "#FFFFFF",
                                                                    fontWeight: 'bold',
                                                                }}>Save</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <View>
                                                            <Pressable onPress={() => {
                                                                setIsVisible(false)
                                                                setName('')
                                                                setBio('')
                                                            }}>
                                                                <AntIcon name="close" size={25} color="#000" />
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        marginTop: 15
                                                    }}>
                                                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Name</Text>
                                                        <Input
                                                            placeholder={user.name}
                                                            disabledInputStyle={{ background: "#000" }}
                                                            inputContainerStyle={{
                                                                borderRadius: 10,
                                                                marginVertical: 10,
                                                                borderColor: '#1D9BF0',
                                                                borderWidth: 2,
                                                                borderBottomWidth: 2
                                                            }}
                                                            inputStyle={{
                                                                color: '#000'
                                                            }}
                                                            placeholderTextColor="#000"
                                                            value={name}
                                                            onChangeText={(e) => setName(e)}
                                                        />
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Bio</Text>
                                                        <Input
                                                            placeholder={user.bio}
                                                            disabledInputStyle={{ background: "#000" }}
                                                            inputContainerStyle={{
                                                                borderRadius: 10,
                                                                marginVertical: 10,
                                                                borderColor: '#1D9BF0',
                                                                borderWidth: 2,
                                                                borderBottomWidth: 2
                                                            }}
                                                            inputStyle={{
                                                                color: '#000'
                                                            }}
                                                            placeholderTextColor="#000"
                                                            value={bio}
                                                            onChangeText={(e) => setBio(e)}
                                                        />
                                                    </View>
                                                </View>
                                            </BottomSheet>
                                            {uid === auth().currentUser.uid ? (
                                                <>
                                                    <View>
                                                        <Pressable onPress={() => setIsVisible(true)}>
                                                            <View style={{
                                                                backgroundColor: '#1D9BF0',
                                                                paddingVertical: 5,
                                                                paddingHorizontal: 10,
                                                                borderRadius: 8,
                                                            }}>
                                                                <Text style={{
                                                                    color: "#FFFFFF",
                                                                    fontSize: 15
                                                                }}>
                                                                    Edit profile</Text>
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                    <View>
                                                        <Pressable onPress={onLogout}>
                                                            <View style={{
                                                                backgroundColor: 'red',
                                                                paddingVertical: 5,
                                                                paddingHorizontal: 10,
                                                                borderRadius: 8,
                                                            }}>
                                                                <Text style={{
                                                                    color: "#FFFFFF",
                                                                    fontSize: 15
                                                                }}>
                                                                    Logout</Text>
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                </>
                                            ) : (
                                                <Pressable onPress={() => console.log('click')}>
                                                    <Follow left={100} />
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>
                                    <View style={{
                                        marginTop: 65,
                                        height: 100,
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: 'Poppins-Light',
                                            fontWeight: 'bold'
                                        }}>
                                            {user.name}</Text>
                                        <Text style={{
                                            color: '#A9A9B0',
                                            fontSize: 13
                                        }}>
                                            @{user.username}</Text>
                                        <View style={{
                                            fontSize: 14,
                                            marginTop: 15
                                        }}>
                                            {user.bio == null ? (
                                                <Text>-</Text>
                                            ) : (
                                                <Text>{user.bio}</Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ fontWeight: 'bold' }}>0</Text>
                                            <Text style={{ color: '#A9A9B0', left: 5 }}>Following</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            left: 20
                                        }}>
                                            <Text style={{ fontWeight: 'bold' }}>100</Text>
                                            <Text style={{ color: '#A9A9B0', left: 5 }}>Followers</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginVertical: 5,
                                borderTopWidth: 1,
                                borderColor: '#A9A9B0'
                            }}>
                                {listUserPost.map(item => (
                                    <Card key={item.id} containerStyle={{
                                        backgroundColor: '#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: 8
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            bottom: 5,
                                            alignItems: 'center'
                                        }}>
                                            <Avatar size="medium" rounded source={{ uri: 'https://source.unsplash.com/random' }} />
                                            {user ? (
                                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {user.name}
                                                    </Text>
                                                    <Text style={{
                                                        color: '#A9A9B0',
                                                        fontSize: 13
                                                    }}>
                                                        {user.username}</Text>
                                                </View>
                                            ) : (
                                                <Text>not found</Text>
                                            )}
                                        </View>
                                        <Text style={{
                                            fontFamily: 'Roboto-Light',
                                            fontSize: 13,
                                            letterSpacing: 0.2
                                        }}>
                                            {item.caption}
                                        </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            top: 5,
                                        }}>
                                            <View>
                                                <FontIcon name="comment-o" size={20} color="#000" />
                                            </View>
                                            <View style={{ marginLeft: 35, flexDirection: 'row', alignItems: 'center' }}>
                                                <AntIcon name="like2" size={20} color="#000" />
                                                <Text>{item.likeCount}</Text>
                                            </View>
                                            <View style={{ marginLeft: 35, flexDirection: 'row', alignItems: 'center' }}>
                                                <AntIcon name="dislike2" size={20} color="#000" />
                                                <Text>{item.unlikeCount}</Text>
                                            </View>
                                        </View>
                                    </Card>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                ) : loading ? (
                    <Text>loading...</Text>
                ) : (
                    <Text>loading...</Text>
                )}
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
