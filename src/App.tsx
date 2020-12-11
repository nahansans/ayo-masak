import React from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { NavigationType } from './types/navigation'

import SplashScreen from './screens/SplashScreen'
import Home from './screens/Home'
import Walkthrough from './screens/Walkthrough'
import RecipesDetail from './screens/RecipesDetail'
import RecipeStep from './screens/RecipeStep'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from './refs/Colors'
import Icon from 'react-native-vector-icons/AntDesign'
import Search from './screens/Search';
import Favorite from './screens/Favorite';

const Tab = createMaterialBottomTabNavigator<NavigationType>()
const Stack = createStackNavigator<NavigationType>()

const BottomTab = () => {
  return (
    <Tab.Navigator
      barStyle = {{
        backgroundColor: Colors.secondary_card
      }}
      activeColor = {Colors.primary_text}
      shifting = {true}
      sceneAnimationEnabled = {true}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options = {{
          tabBarIcon: ({ color }) => (
            <Icon name = "home" color = {color} size = {24} />
          ),
          tabBarLabel: "Beranda"
        }}
      />
      <Tab.Screen 
        name="Search"
        component={Search}
        options = {{
          tabBarIcon: ({ color }) => (
            <Icon name = "search1" color = {color} size = {24} />
          ),
          tabBarLabel: "Pencarian"
        }}
      />
      <Tab.Screen 
        name="Favorite"
        component={Favorite}
        options = {{
          tabBarIcon: ({ color }) => (
            <Icon name = "hearto" color = {color} size = {24} />
          ),
          tabBarLabel: "Favorit"
        }}
      />
    </Tab.Navigator>
  )
}


const App = () => {
  return (
    <>
    <StatusBar barStyle = "light-content" backgroundColor = {Colors.background} />
    <NavigationContainer>
      <Stack.Navigator
        headerMode = "none"
        screenOptions = {{
          ...TransitionPresets.SlideFromRightIOS
        }}
      >
        <Stack.Screen name = "SplashScreen" component = {SplashScreen} />
        <Stack.Screen name = "Walkthrough" component = {Walkthrough} />
        <Stack.Screen name = "BottomTab" component = {BottomTab} />
        <Stack.Screen name = "RecipesDetail" component = {RecipesDetail} />
        <Stack.Screen name = "RecipeStep" component = {RecipeStep} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App