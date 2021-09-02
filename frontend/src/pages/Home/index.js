import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { BottomNav, Title } from '../../components'
import { data } from '../../config/dummy'
import { Card, Avatar, FAB } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'

const HomeScreen = ({ navigation }) => {
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
                        width: 340,
                        marginTop: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 15
                        }}>
                            <Title fontFamily='Dancing-Script' fontSize={25} text='Tweeky'/>
                            <Pressable onPress={() => navigation.navigate('Message')}>
                                <FeatherIcon name="mail" size={25} color="#000" />
                            </Pressable>
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
                <FAB
                    placement="right"
                    color="#1D9BF0"
                    size="medium"
                    icon={<FeatherIcon name="plus" color="#FFFFFF" size={20} />}
                />
            </View>
            <BottomNav navigator={navigation}/>
        </SafeAreaView>
    )
}

export default HomeScreen
