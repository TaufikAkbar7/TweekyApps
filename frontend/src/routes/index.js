import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MessageScreen, SearchScreen, ProfileScreen, MessageDetailScreen } from '../pages';
const Routes = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Message"
                    component={MessageScreen}
                    options={{
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        headerTitle: false,
                        headerTintColor: '#000',
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                        headerBackVisible: false,
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MessageDetail"
                    component={MessageDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
