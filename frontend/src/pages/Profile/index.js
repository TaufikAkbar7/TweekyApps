import React from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomNav } from '../../components'
import { profile, data } from '../../config/dummy'
import { Avatar, Card, } from 'react-native-elements'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'

const ProfileScreen = ({ navigation }) => {

    const { username, name, tweets, user_image, bio, followers, following } = profile;

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
                <ScrollView>
                    <View style={{
                        width: 360,
                    }}>
                        <View style={{
                            height: 300,
                            borderBottomWidth: 1,
                            borderColor: '#A9A9B0'
                            // backgroundColor: 'red'
                        }}>
                            <View style={{
                                flex: 0.4,
                            }}>
                                <Image source={{ uri: user_image }} style={{
                                    width: 360,
                                    height: 113,
                                }} />
                            </View>
                            <View style={{
                                // backgroundColor: 'pink',
                                marginHorizontal: 10,
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                top: 65,
                                width: 340,
                                // backgroundColor: 'green'
                                // position: 'absolute'
                            }}>
                                <Avatar size="large" rounded source={{ uri: user_image }} />
                                <Pressable onPress={() => console.log('click')}>
                                    <View style={{
                                        borderColor: "#1D9BF0",
                                        borderWidth: 2,
                                        padding: 5,
                                        borderRadius: 8,
                                        left: 180
                                    }}>
                                        <Text style={{
                                            color: "#1D9BF0",
                                            fontSize: 15
                                        }}>
                                            Edit profile</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={{
                                marginTop: 65,
                                // backgroundColor: 'blue',
                                height: 100,
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'Poppins-Light',
                                    fontWeight: 'bold'
                                }}>
                                    {name}</Text>
                                <Text style={{
                                    color: '#A9A9B0',
                                    fontSize: 13
                                }}>
                                    {username}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    top: 10
                                }}>
                                    {bio}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                // backgroundColor: 'yellow',
                                marginTop: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{fontWeight: 'bold'}}>{following} </Text>
                                    <Text style={{color: '#A9A9B0'}}>Following</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    left: 20
                                }}>
                                    <Text style={{fontWeight: 'bold'}}>{followers} </Text>
                                    <Text style={{color: '#A9A9B0'}}>Followers</Text>
                                </View>
                            </View>
                            </View>
                        </View>
                        {data.map(item => (
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
                                    <Avatar size="medium" rounded source={{ uri: item.user_image }} />
                                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold'
                                        }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{
                                            color: '#A9A9B0',
                                            fontSize: 13
                                        }}>
                                            {item.username}</Text>
                                    </View>
                                </View>
                                <Text style={{
                                    fontFamily: 'Roboto-Light',
                                    fontSize: 13,
                                    letterSpacing: 0.2
                                }}>
                                    {item.tweet}
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    top: 5,
                                }}>
                                    <View>
                                        <FontIcon name="comment-o" size={20} color="#000" />
                                    </View>
                                    <View style={{ marginLeft: 35 }}>
                                        <AntIcon name="like2" size={20} color="#000" />
                                    </View>
                                    <View style={{ marginLeft: 35 }}>
                                        <AntIcon name="dislike2" size={20} color="#000" />
                                    </View>
                                </View>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <BottomNav navigator={navigation} />
        </SafeAreaView>
    )
}

export default ProfileScreen
