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

const Stack = createStackNavigator<NavigationType>()

const App = () => {
  return (
    <>
    <StatusBar barStyle = "light-content" backgroundColor = "#000" />
    <NavigationContainer>
      <Stack.Navigator
        headerMode = "none"
        screenOptions = {{
          ...TransitionPresets.SlideFromRightIOS
        }}
      >
        <Stack.Screen name = "SplashScreen" component = {SplashScreen} />
        <Stack.Screen name = "Walkthrough" component = {Walkthrough} />
        <Stack.Screen name = "Home" component = {Home} />
        <Stack.Screen name = "RecipesDetail" component = {RecipesDetail} />
        <Stack.Screen name = "RecipeStep" component = {RecipeStep} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App