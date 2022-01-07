import React, { useState, useEffect } from 'react'
import { View, ScrollView, Pressable, Text } from 'react-native'
import { Title, Spinner, Cards, Modal } from '../../components'
import { FAB } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import FeatherIcon from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useSelector, useDispatch } from "react-redux"
import { listPost, getUser } from '../../config/redux/actions'

const HomeScreen = ({ navigation }) => {

    const [isVisiblePost, setIsVisiblePost] = useState(false)
    const [caption, setCaption] = useState()
    const [reply, setReply] = useState()
    const [isVisibleComment, setIsVisibleComment] = useState({})
    const userListPost = useSelector((state) => state.userListPost)
    const { loading, listUserPost, error } = userListPost
    const userData = useSelector((state) => state.userData)
    const { user } = userData
    // const userPostProfile = useSelector((state) => state.userPostProfile)
    // const { listUserPost: followingPosts } = userPostProfile
    // const userProfile = useSelector((state) => state.userProfile)
    // const { users } = userProfile
    const dispatch = useDispatch();

    const onPost = () => {
        if (caption != null) {
            firestore()
                .collection('posts')
                .doc(auth().currentUser.uid)
                .collection('userPosts')
                .add({
                    uid: auth().currentUser.uid,
                    caption,
                    likeCount: 0,
                    unlikeCount: 0,
                    createAt: firestore.FieldValue.serverTimestamp()
                })
            setIsVisiblePost(false)
            setCaption('')
        }
    }

    const onDelete = (id) => {
        firestore()
            .collection('posts')
            .doc(auth().currentUser.uid)
            .collection('userPosts')
            .doc(id)
            .delete()
            .then(() => console.log('User deleted!'))
    }

    const onComment = (id) => {
        // try {
        //     firestore()
        //         .collection('posts')
        //         .doc(auth().currentUser.uid)
        //         .collection('userPosts')
        //         .doc("inWW9z2x2Y4D1Yi06qQC")
        //         .collection('comments')
        //         .add({
        //             reply: reply
        //         })
        // } catch (error) {
        //     console.log(error)
        // }
        console.log(id)

    }

    const onToggleComment = (id) => {
        setIsVisibleComment(prevShown => ({
            ...prevShown,
            [id]: !prevShown[id]
        }))
    }

    // const onUpdate = (uid) => {
    //     try {
    //         if (caption != null) {
    //             firestore()
    //                 .collection('posts')
    //                 .doc(auth().currentUser.uid)
    //                 .collection('userPosts')
    //                 .doc(uid)
    //                 .update({ caption: "hhh" })
    //                 .then(() => console.log('update post success!'))
    //             // console.log(typeof caption)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    useEffect(() => {
        dispatch(listPost())
        dispatch(getUser())
        // dispatch(fetchUserFollowing())
    }, [dispatch])

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
                backgroundColor: '#F6F6F6',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                {userListPost && listUserPost && listUserPost.length > 0 ? (
                    <View style={{
                        width: 340,
                        // marginTop: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 15,
                            paddingVertical: 15,
                        }}>
                            <Title fontFamily='Dancing-Script' fontSize={25} text='Tweeky' />
                            <Pressable onPress={() => navigation.navigate('Message')}>
                                <FeatherIcon name="mail" size={25} color="#000" />
                            </Pressable>
                        </View>
                        <ScrollView>
                            <View style={{ width: 340, marginBottom: 30 }}>
                                <View style={{ marginVertical: 5 }}>
                                    <Cards
                                        listData={listUserPost}
                                        userData={user}
                                        caption={caption}
                                        setCaption={setCaption}
                                        onDelete={onDelete}
                                        left={150}
                                        onComment={onComment}
                                        changeText={(e) => setReply(e)}
                                        onPress={() => {
                                            setReply('')
                                            setIsVisibleComment(false)
                                        }}
                                        onToggleComment={onToggleComment}
                                        isVisibleComment={isVisibleComment}
                                    />
                                    {/* <Cards
                                        listData={post}
                                        userData={user}
                                        caption={caption}
                                        setCaption={setCaption}
                                        onDelete={onDelete}
                                        left={150}
                                        // onUpdate={onUpdate}
                                    /> */}
                                    {/* {followingPosts.map(item => <Text>{item.post}</Text>)} */}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                ) : loading ? (
                    <View style={{
                        flex: 1,
                        backgroundColor: '#F6F6F6',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Spinner />
                    </View>
                ) : (
                    <Text>no posts</Text>
                )}

                <Modal
                    placeholder="Whats Happenning?"
                    isVisible={isVisiblePost}
                    name="Post"
                    value={caption}
                    onChangeText={(e) => setCaption(e)}
                    onPost={onPost}
                    onPress={() => {
                        setCaption('')
                        setIsVisiblePost(false)
                    }}
                />

                <FAB
                    placement="right"
                    color="#1D9BF0"
                    size="medium"
                    icon={<FeatherIcon name="plus" color="#FFFFFF" size={20} />}
                    onPress={() => setIsVisiblePost(true)}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
