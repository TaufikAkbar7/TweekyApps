import React from 'react'
import { View, Text } from 'react-native'

export const Follow = ({ left, right }) => {
    return (
        <View style={{
            backgroundColor: '#1D9BF0',
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 8,
            left: left,
            right: right
        }}>
            <Text style={{
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 'bold'
            }}>
                Follow</Text>
        </View>
    )
}

export const Following = ({ left, right }) => {
    return (
        <View style={{
            backgroundColor: 'transparent',
            padding: 5,
            borderColor: '#1D9BF0',
            borderRadius: 8,
            borderWidth: 2,
            left: left,
            right: right
        }}>
            <Text style={{
                color: '#1D9BF0',
                fontSize: 15,
                fontWeight: 'bold'
            }}>
                Following</Text>
        </View>
    )
}