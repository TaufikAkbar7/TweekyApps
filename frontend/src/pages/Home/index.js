import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { BottomNav } from '../../components'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { data } from '../../config/dummy'
import { Card, Avatar, FAB } from 'react-native-elements'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'

const Home = () => {
    return (
        <View style={{
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
                    height: 700,
                    marginTop: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 15
                    }}>
                        <Text style={{
                            fontFamily: 'Dancing-Script',
                            fontSize: 20
                        }}>
                            Tweeky</Text>
                        <FeatherIcon name="mail" size={25} color="#000" />
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
                            <Text>
                                {item.tweet}
                            </Text>
                            <View style={{ 
                                flexDirection: 'row',
                                top: 5,
                                }}>
                                <View>
                                    <FontIcon name="comment-o" size={20} color="#000" />
                                </View>
                                <View style={{ marginLeft: 25 }}>
                                    <AntIcon name="like2" size={20} color="#000" />
                                </View>
                                <View style={{ marginLeft: 25 }}>
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
                icon={<FeatherIcon name="plus" color="#FFFFFF" size={20}/>} 
                />
            </View>
            <BottomNav />
        </View>
    )
}

export default Home
