import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomNav } from '../../components'

const ProfileScreen = ({ navigation }) => {
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
                <Text>Profile</Text>
            </View>
            <BottomNav navigator={navigation}/>
        </SafeAreaView>
    )
}

export default ProfileScreen
