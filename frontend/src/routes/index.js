import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MessageScreen, SearchScreen, ProfileScreen, MessageDetailScreen } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons'

const Routes = () => {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const TabStack = () => {
        return (
            <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    
                    switch(route.name){
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline'
                            break;
                        case 'Search':
                            iconName = focused ? 'search' : 'search-outline'
                            break;
                        case 'Profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                    }

                    return <Ionicon name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: "#1D9BF0",
                tabBarInactiveTintColor: "#000",
            })}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TabScreen"
                    component={TabStack}
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
                    name="MessageDetail"
                    component={MessageDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
