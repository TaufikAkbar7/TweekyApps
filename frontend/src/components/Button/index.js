import React from 'react'
import { View, Text, Pressable } from 'react-native'

export const Follow = ({ left, right, onClick }) => {
    return (
        <View style={{
            backgroundColor: '#1D9BF0',
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 8,
            left: left,
            right: right
        }}>
            <Pressable onPress={onClick}>
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    Follow</Text>
            </Pressable>
        </View>

    )
}

export const Following = ({ left, right, onClick }) => {
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
            <Pressable onPress={onClick}>
                <Text style={{
                    color: '#1D9BF0',
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    Following</Text>
            </Pressable>
        </View>

    )
}