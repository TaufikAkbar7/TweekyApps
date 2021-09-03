import React from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search } from '../../components'
import { data } from '../../config/dummy'

const SearchScreen = ({ navigation }) => {
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
                        marginTop: 20,
                    }}>
                        <View>
                            <Search placeholder='search...'/>
                        </View>
                        <View style={{ top: 20 }}>
                            {data.map(item => (
                                <ListItem key={item.id} bottomDivider containerStyle={{
                                    marginVertical: 15,
                                    borderRadius: 8
                                    }}>
                                    <Avatar size="medium" rounded source={{uri: item.user_image}}/>
                                    <ListItem.Content>
                                        <ListItem.Title>{item.name}</ListItem.Title>
                                        <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <TouchableOpacity>
                                        <View>
                                        <Text style={{
                                            color: '#1D9BF0',
                                            fontSize: 15,
                                            fontWeight: 'bold'
                                        }}>
                                            Follow</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ListItem>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen
