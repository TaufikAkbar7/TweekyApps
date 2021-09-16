import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search } from '../../components'
import { data } from '../../config/dummy'
import firestore from '@react-native-firebase/firestore'

const SearchScreen = ({ navigation }) => {

    const [users, setUsers] = useState([])

    const getUsers = (search) => {
        firestore()
        .collection('user')
        .where('name', '>=', search)
        .get()
        .then(data => {
            let users = data.docChanges.map(doc => {
                const getData = doc.data()
                const id = doc.id
                return { id, ...getData } 
            })
            setUsers(users)
        })        
    }

    console.log(users)
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
                <ScrollView>
                    <View style={{
                        width: 325,
                        marginTop: 20,
                    }}>
                        <View>
                            <Search placeholder='search...' getUsers={getUsers}/>
                        </View>
                        <View style={{ top: 20 }}>
                            {/* {users.map(item => (
                                <ListItem key={item.id} bottomDivider containerStyle={{
                                    marginVertical: 15,
                                    borderRadius: 8
                                    }}>
                                    <Avatar size="medium" rounded source={{uri: 'https://source.unsplash.com/random'}}/>
                                    <ListItem.Content>
                                        <ListItem.Title>{item.name}</ListItem.Title>
                                        <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <TouchableOpacity>
                                        <View>
                                        <Text style={{
                                            color: '#1D9BF0',
                                            fontSize: 15,
                                            fontWeight: 'bold'
                                        }}>
                                            Follow</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ListItem>
                            ))} */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen
