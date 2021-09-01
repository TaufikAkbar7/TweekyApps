import React from 'react'
import { View, Text } from 'react-native'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'

const BottomNav = () => {
    return (
        <View style={{
            height: 54,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <View>
                <SimpleIcon name="home" size={20} color="#000" />
            </View>
            <View>
                <AntIcon name="search1" size={20} color="#000" />
            </View>
            <View>
                <AntIcon name="user" size={20} color="#000" />
            </View>
        </View>
    )
}

export default BottomNav
