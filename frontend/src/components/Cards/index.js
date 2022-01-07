import React, { useState } from 'react'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { Card, Avatar } from 'react-native-elements'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Modal from '../Modal'

const Cards = ({
    listData,
    userData,
    // caption,
    // setCaption,
    // onUpdate,
    onComment,
    onDelete,
    left,
    reply,
    changeText,
    isVisibleComment,
    onToggleComment,
    onPress
}) => {

    const [isVisible, setIsVisible] = useState({})

    const onToggle = (id) => {
        setIsVisible(prevShown => ({
            ...prevShown,
            [id]: !prevShown[id]
        }))
    }

    return (
        <>
            {listData.map((item, i) => (
                <Card key={i} containerStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    borderRadius: 8
                }}>
                    <View style={{
                        flexDirection: 'row',
                        bottom: 5,
                        alignItems: 'flex-start',
                    }}>
                        <Avatar size="medium" rounded source={{ uri: 'https://source.unsplash.com/random' }} />
                        {userData ? (
                            <View style={{ flexDirection: 'column', marginLeft: 10, alignSelf: 'center' }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>
                                    {userData.name}
                                </Text>
                                <Text style={{
                                    color: '#A9A9B0',
                                    fontSize: 13
                                }}>
                                    {userData.username}</Text>
                            </View>
                        ) : (
                            <Text>not found</Text>
                        )}
                        <View style={{ left: left, flexDirection: 'column' }}>
                            <Pressable onPress={() => onToggle(item.id)}>
                                <EntypoIcon size={16} name="dots-three-vertical" color="#000" />
                            </Pressable>

                            {isVisible[item.id] && (
                                <View style={{
                                    backgroundColor: '#f6f6f6',
                                    width: 80,
                                    // height: 60,
                                    right: 10,
                                    top: 18,
                                    position: 'absolute',
                                    padding: 5,
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: 60
                                    }}>
                                        <View>
                                            <TouchableOpacity>
                                                <Text>Update</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => onDelete(item.id)}>
                                                <Text>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: '#999',
                                        width: 80,
                                        bottom: 30
                                    }} />
                                    {/* update modal */}
                                    {/* <Modal
                                        placeholder={item.caption}
                                        isVisible={isVisibleUpdate}
                                        name="Update"
                                        value={caption}
                                        onChangeText={(e) => setCaption(e)}
                                        onPost={onUpdate}
                                        onPress={() => {
                                            setCaption('')
                                            setIsVisibleUpdate(false)
                                        }}
                                    /> */}
                                </View>
                            )}
                        </View>
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
                        <TouchableOpacity onPress={() => {
                            onToggleComment(item.id)
                        }}>
                            <View>
                                <FontIcon name="comment-o" size={20} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {/* modal comments */}
                        <Modal
                            placeholder="Tweet your reply"
                            isVisible={isVisibleComment[item.id]}
                            name="Post"
                            value={reply}
                            onChangeText={changeText}
                            onPost={onComment}
                            onPress={onPress}
                        />
                        {/* end modal comments */}
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
    )
}

export default Cards
