import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    HomeScreen,
    MessageScreen,
    SearchScreen,
    ProfileScreen,
    MessageDetailScreen,
    LoginScreen,
    RegisterScreen,
    SplashScreen,
    ForeignProfile
} from './pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './config/redux/store';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline'
                            break;
                        case 'Search':
                            iconName = focused ? 'search' : 'search-outline'
                            break;
                        case 'Profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                    }

                    return <Ionicon name={iconName} size={size} color={color} />
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
                // listeners={({ navigation }) => ({
                //     tabPress: e => {
                //         e.preventDefault();
                //         navigation.navigate("Profile", { uid: auth().currentUser.uid })
                //     }
                // })}
            />
        </Tab.Navigator>
    )
}

const App = () => {
    const [isLogin, setIsLogin] = useState()

    const cekLogin = async () => {
        await AsyncStorage.getItem('UserData')
            .then(value => {
                if (!value) {
                    console.log('User doesnt exist!')
                } else {
                    setIsLogin(JSON.parse(value))
                }
            })
    }

    useEffect(() => {
        cekLogin();
    }, [])

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    {isLogin ? (
                        <Stack.Screen
                            name="SplashScreen"
                            options={{ headerShown: false }}
                        >
                            {(navigation) => <SplashScreen {...navigation} screen="TabScreen" />}
                        </Stack.Screen>
                    ) : (
                        <Stack.Screen
                            name="SplashScreen"
                            options={{ headerShown: false }}
                        >
                            {(navigation) => <SplashScreen {...navigation} screen="Login" />}
                        </Stack.Screen>
                    )}
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                    />
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
                    <Stack.Screen
                        name="UserProfile"
                        component={ForeignProfile}
                        options={{
                            headerTransparent: true,
                            headerBackTitleVisible: false,
                            headerTitle: false,
                            headerTintColor: '#FFFFFF',
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerBackVisible: true,
                            title: ''
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App
