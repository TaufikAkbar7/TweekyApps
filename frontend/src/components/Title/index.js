import React from 'react'
import { Text } from 'react-native'

const Title = ({ fontFamily, fontSize, fontWeight, text }) => {
    return (
        <Text style={{
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight
        }}>
            {text}</Text>
    )
}

export default Title
