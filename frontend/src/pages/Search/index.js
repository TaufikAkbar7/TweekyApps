import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search } from '../../components'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const SearchScreen = ({ navigation }) => {

    const [users, setUsers] = useState([])
    const [keyword, setKeyword] = useState()

    const getUsers = (search) => {
        firestore()
            .collection('user')
            .where('name', '>=', search)
            .get()
            .then(data => {
                let users = data.docs.map(doc => {
                    const getData = doc.data()
                    const id = doc.id
                    return { id, ...getData }
                })
                setUsers(users)
            })
    }

    // console.log(users)
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
                            <Search placeholder='search...' keyword={keyword} setKeyword={setKeyword} getUsers={getUsers} />
                        </View>
                        <View>
                            {users.filter(i => i.id !== auth().currentUser.uid).map(item => (

                                <ListItem
                                    key={item.id}
                                    // bottomDivider
                                    containerStyle={{
                                        marginVertical: 15,
                                        borderRadius: 8,
                                        backgroundColor: '#FFFFFF',
                                    }}
                                >
                                    <Avatar size="medium" rounded source={{ uri: 'https://source.unsplash.com/random' }} />
                                    <ListItem.Content>
                                        <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { uid: item.id })}>
                                            <ListItem.Title>{item.name}</ListItem.Title>
                                            <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
                                        </TouchableOpacity>
                                    </ListItem.Content>
                                    <TouchableOpacity>
                                    </TouchableOpacity>
                                </ListItem>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen
