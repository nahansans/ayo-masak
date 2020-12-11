import React, { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { Fonts } from './../refs/Fonts'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'


type PropsList = {
    navigation: StackNavigationProp<NavigationType, "Favorite">
}

const Favorite = (props: PropsList) => {
    return <View />
}

export default Favorite