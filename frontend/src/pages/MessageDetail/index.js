import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements'

const MessageDetailScreen = ({ navigation }) => {

    // const { user } = route.params

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        backgroundColor: 'red'
                    }}>

                    </View>
                </ScrollView>
            </View>
            <View style={{
                height: 40,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                    <View>
                        <FontAwesomeIcon name='image' size={25} color="#1D9BF0" />
                    </View>
                    <View>
                        <Input
                            placeholder='Start a message'
                            inputContainerStyle={{
                                height: 30
                            }}
                            containerStyle={{
                                width: 230,
                                height: 40,
                                paddingVertical: 5
                            }}
                        />
                    </View>
                    <View>
                        <Ionicons name='send-outline' size={25} color="#1D9BF0" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MessageDetailScreen
