import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { BottomNav } from '../../components'

const Home = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'red'
        }}>
            <View style={{
                flex: 1,
                backgroundColor: 'blue'
            }}>
                
            </View>
            <BottomNav/>
        </View>
    )
}

export default Home
