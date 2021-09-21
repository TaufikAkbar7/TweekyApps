import React from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { BottomSheet, Input } from 'react-native-elements'
import AntIcon from 'react-native-vector-icons/AntDesign'

const Modal = ({ 
    placeholder, 
    isVisible, 
    onPost, 
    name, 
    onPress, 
    onChangeText, 
    value 
}) => {
    // console.log(value)
    return (
        <BottomSheet
            isVisible={isVisible}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        >
            <View style={{
                backgroundColor: '#FFFFFF',
                // height: 450,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginTop: 10
                }}>
                    <TouchableOpacity onPress={onPost}>
                        <View style={{
                            padding: 5,
                            backgroundColor: "#1D9BF0",
                            paddingHorizontal: 15,
                            borderRadius: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: "#FFFFFF",
                                fontWeight: 'bold',
                            }}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Pressable onPress={onPress}>
                            <AntIcon name="close" size={25} color="#000" />
                        </Pressable>
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <Input
                        placeholder={placeholder}
                        disabledInputStyle={{ background: "#000" }}
                        inputContainerStyle={{
                            borderRadius: 10,
                            marginVertical: 10,
                            borderColor: '#1D9BF0',
                            borderWidth: 2,
                            borderBottomWidth: 2
                        }}
                        inputStyle={{
                            color: '#000'
                        }}
                        placeholderTextColor="#000"
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
            </View>
        </BottomSheet>
    )
}

export default Modal
