import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import { Title } from '../../components'
import { Card, Avatar, FAB, BottomSheet, Input } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useSelector, useDispatch } from "react-redux"
import { listPost, getUser } from '../../config/redux/actions'

const HomeScreen = ({ navigation }) => {

    const [isVisible, setIsVisible] = useState(false)
    const [caption, setCaption] = useState()
    const userListPost = useSelector((state) => state.userListPost)
    const { loading, listUserPost, error } = userListPost
    const userData = useSelector((state) => state.userData)
    const { user } = userData
    const dispatch = useDispatch();

    const onPost = () => {
        if (caption != null) {
            firestore()
                .collection('posts')
                .doc(auth().currentUser.uid)
                .collection('userPosts')
                .add({
                    caption,
                    likeCount: 0,
                    unlikeCount: 0,
                    createAt: firestore.FieldValue.serverTimestamp()
                })
            setIsVisible(false)
            setCaption('')
        }
    }

    useEffect(() => {
        dispatch(listPost())
        dispatch(getUser())
    }, [dispatch])


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
                {userListPost && listUserPost && listUserPost.length > 0 ? (
                    <>
                        <ScrollView>
                            <View style={{
                                width: 340,
                                marginTop: 20,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginHorizontal: 15
                                }}>
                                    <Title fontFamily='Dancing-Script' fontSize={25} text='Tweeky' />
                                    <Pressable onPress={() => navigation.navigate('Message')}>
                                        <FeatherIcon name="mail" size={25} color="#000" />
                                    </Pressable>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    {listUserPost ? (
                                        <>
                                            {listUserPost.map((item, i) => (
                                                <Card key={i} containerStyle={{
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
                                        </>
                                    ) : (
                                        <Text>loading...</Text>
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    </>
                ) : loading ? (
                    <Text>loading...</Text>
                ) : (
                    <Text>loading...</Text>
                )}
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
                            marginTop: 10
                        }}>
                            <TouchableOpacity onPress={onPost}>
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
                                    }}>Post</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Pressable onPress={() => {
                                    setIsVisible(false)
                                    setCaption('')
                                }}>
                                    <AntIcon name="close" size={25} color="#000" />
                                </Pressable>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 15
                        }}>
                            <Input
                                placeholder="Whats Happenning?"
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
                                value={caption}
                                onChangeText={(e) => setCaption(e)}
                            />
                        </View>
                    </View>
                </BottomSheet>
                <FAB
                    placement="right"
                    color="#1D9BF0"
                    size="medium"
                    icon={<FeatherIcon name="plus" color="#FFFFFF" size={20} />}
                    onPress={() => setIsVisible(true)}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
