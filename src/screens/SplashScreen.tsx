import React, { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { Fonts } from './../refs/Fonts'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from './../refs/Colors';


type PropsList = {
    navigation: StackNavigationProp<NavigationType, "SplashScreen">
}

const SplashScreen = (props: PropsList) => {
    const opacity = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                delay: 500
            }).start(async() => {
                const isWalkthrough = await AsyncStorage.getItem('isWalkthrough')
                if (isWalkthrough != null) {
                    props.navigation.replace("BottomTab")
                } else {
                    props.navigation.replace("Walkthrough")
                }

            })
        })
    }, [])

    return (
        <View style = {{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }} >
            <Animated.Text
                style = {{
                    fontFamily: Fonts.Lato.Bold,
                    fontSize: 30,
                    letterSpacing: -3,
                    opacity,
                    color: Colors.primary_text
                }}
            >
                Ayo Masak!
            </Animated.Text>
        </View>
    )
}

export default SplashScreen