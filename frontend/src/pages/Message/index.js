import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search } from '../../components'
import { messages } from '../../config/dummy'

const MessageScreen = ({ navigation }) => {

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
                        width: 325,
                        alignItems: 'flex-start',
                    }}>
                        <View style={{
                            top: 40
                        }}>
                            <Search placeholder='search...'/>
                        </View>
                        <View style={{
                            height: 600,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            top: 20
                        }}>
                            {messages.map(item => (
                                <View key={item.id} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 30
                                }}>
                                    <Avatar size="medium" rounded source={{ uri: item.user_image }} />
                                    <TouchableOpacity onPress={() => navigation.navigate('MessageDetail')}>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: '#3B3B3B'
                                        }}>
                                            {item.name}</Text>
                                        <Text style={{
                                            color: '#3B3B3B',
                                            fontSize: 13
                                        }}>
                                            {item.message}</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MessageScreen
