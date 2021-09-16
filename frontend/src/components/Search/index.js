import React from 'react'
import { SearchBar } from 'react-native-elements'

const Search = ({ placeholder, getUsers }) => {

    return (
        <SearchBar
        placeholder={placeholder}
        onChangeText={(e) => getUsers(e)}
        value={data}
        searchIcon={{ size: 20 }}
        containerStyle={{
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            width: 325,
        }}
        inputContainerStyle={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10
        }}
    />
    )
}

export default Search
