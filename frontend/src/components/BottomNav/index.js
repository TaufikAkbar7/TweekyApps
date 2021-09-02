import React from 'react'
import { View, Pressable } from 'react-native'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'

const BottomNav = ({ navigator }) => {
    return (
        <View style={{
            height: 54,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <View>
                <Pressable onPress={() => navigator.navigate('Home')}>
                    <SimpleIcon name="home" size={20} color="#000" />
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigator.navigate('Search')}>
                    <AntIcon name="search1" size={20} color="#000" />
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigator.navigate('Profile')}>
                    <AntIcon name="user" size={20} color="#000" />
                </Pressable>
            </View>
        </View>
    )
}

export default BottomNav
