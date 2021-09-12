import React from 'react'
import { View } from 'react-native'
import Svg from '../../assets/Tweeky_Apps.svg'

const index = ({ navigation, screen }) => {

    setTimeout(() => {
        screen === 'TabScreen' ? navigation.replace(screen, { screen: 'Home' }) : navigation.replace(screen)
    }, 3000)

    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: '#1D9BF0', 
            justifyContent: 'center', 
            alignItems: 'center' 
            }}>
            <Svg width="200"/>
        </View>
    )
}

export default index
