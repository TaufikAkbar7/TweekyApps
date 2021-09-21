import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, BottomSheet, Input } from 'react-native-elements'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useSelector, useDispatch } from "react-redux"
import { fetchUserFollowing } from '../../config/redux/actions'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Cards, Follow, Following, Spinner } from '../../components'

const ForeignProfile = ({ navigation, route }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const [following, setFollowing] = useState(false)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const userFollowing = useSelector((state) => state.userFollowing)
    const { listUserPost: userFollow, loading } = userFollowing
    const { uid } = route.params
    const dispatch = useDispatch()

    const onSave = () => {
        try {
            firestore()
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

    const onFollow = () => {
        firestore()
            .collection("following")
            .doc(auth().currentUser.uid)
            .collection("userFollowing")
            .doc(uid)
            .set({})
    }
    const onUnfollow = () => {
        firestore()
            .collection("following")
            .doc(auth().currentUser.uid)
            .collection("userFollowing")
            .doc(uid)
            .delete()
    }

    useEffect(() => {
        dispatch(fetchUserFollowing())
        
        try {
            if (userFollow.indexOf(uid) > -1) {
                setFollowing(true)
            } else {
                setFollowing(false)
            }
        } catch (error) {
            console.log(error)
        }

        firestore()
            .collection('user')
            .doc(uid)
            .onSnapshot(snapshot => {
                if (snapshot.exists) {
                    let user = snapshot.data()
                    user.id = snapshot.id
                    setUser(user)
                } else {
                    console.log('user doest exists')
                }
            })
        firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .orderBy('createAt', 'desc')
            .onSnapshot((snapshot) => {
                let getData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setPosts(getData)
            })

    }, [dispatch, uid])

    // console.log(userForeign)
    // console.log(posts)
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
                {userFollow && user && posts && posts.length > 0 ? (
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
                                            {following ? (
                                                <Following left={100} onClick={() => onUnfollow()} />
                                            ) : (
                                                <Follow left={100} onClick={() => onFollow()} />
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
                                <Cards listData={posts} userData={user} left={200} />
                            </View>
                        </View>
                    </ScrollView>
                ) : loading ? (
                    <Spinner />
                ) : (
                    <Text>no posts</Text>
                )}
            </View>
        </SafeAreaView>
    )
}



export default ForeignProfile
