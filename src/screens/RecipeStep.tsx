import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, Platform, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableRipple } from 'react-native-paper'

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import { Fonts } from './../refs/Fonts'
import Tts from 'react-native-tts'

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "RecipeStep">,
    route: RouteProp<NavigationType, "RecipeStep">
}


const RecipeStep = (props: PropsList) => {
    const { navigation, route } = props
    // const { currentStepIndex } = route.params
    const steps = route.params.steps || []
    const currentStepIndex = route.params.currentStepIndex || 0
    const [isPlay, setIsPlay] = useState(false)
    useEffect(() => {
        Tts.addEventListener('tts-finish', () => setIsPlay(false));
        return () => {
            Tts.removeEventListener('tts-finish', () => setIsPlay(false))
        }
    }, [])

    const textToSpeech = async() => {
        Tts.setDefaultLanguage('id-ID')
        setIsPlay(!isPlay)
        if (!isPlay) {
            Tts.speak(`${steps[currentStepIndex]}`, {
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 0.5,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            })            

        } else {
            Tts.stop()
        }
    }

    return (
        <SafeAreaView
            style = {{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <TouchableRipple
                style = {{
                    alignSelf: "flex-start",
                    borderRadius: 100,
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    marginVertical: 4
                }}
                rippleColor = "rgba(0,0,0,0.15)"
                underlayColor = "rgba(0,0,0,0.15)"
                borderless = {Platform.Version < 28 ? false : true}
                onPress = {() => navigation.pop()}
            >
                <Icon
                    size = {24}
                    name = "arrowleft"
                    color = "black"
                />
            </TouchableRipple>
            <View
                style = {{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20
                }}
            >
                <Text
                    style = {{
                        fontFamily: Fonts.Lato.Regular,
                        fontSize: 20,
                    }}
                >
                    {steps[currentStepIndex]}
                </Text>
                <TouchableRipple
                    style = {{
                        borderRadius: 100,
                        padding: 24
                    }}
                    rippleColor = "rgba(0,0,0,0.15)"
                    underlayColor = "rgba(0,0,0,0.15)"
                    borderless = {Platform.Version < 28 ? false : true}
                    onPress = {() => textToSpeech()}
                >
                    <Icon
                        size = {24}
                        name = {isPlay ? "pausecircleo" : "playcircleo" }
                        color = "#303030"
                    />
                </TouchableRipple>

                <View style = {{ flexDirection: "row" }} >
                    <TouchableRipple
                        style = {{
                            backgroundColor: "paleturquoise",
                            width: "30%",
                            padding: 20,
                            borderRadius: 8,
                            marginTop: 20,
                            shadowColor: "dimgray",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 11,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress = {() => {
                            if (currentStepIndex > 0) {
                                navigation.push("RecipeStep", {steps, currentStepIndex: currentStepIndex - 1})
                            } else {
                                navigation.pop()
                            }
                        }}
                        rippleColor = "rgba(0,0,0,0.15)"
                        underlayColor = "rgba(0,0,0,0.15)"
                        borderless = {Platform.Version < 28 ? false : true}
                    >
                        <Icon
                            size = {24}
                            name = "left"
                            color = "#303030"
                        />
                    </TouchableRipple>
                    <View style = {{ width: "40%" }} />
                    <TouchableRipple
                        style = {{
                            backgroundColor: "paleturquoise",
                            width: "30%",
                            padding: 20,
                            borderRadius: 8,
                            marginTop: 20,
                            shadowColor: "dimgray",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 11,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress = {() => {
                            if (currentStepIndex < ( steps.length - 1) ) {
                                navigation.push("RecipeStep", {steps, currentStepIndex: currentStepIndex + 1})
                            } else {
                                navigation.navigate("RecipesDetail", {key: route.params.key, thumb: route.params.thumb})
                            }
                        }}
                        rippleColor = "rgba(0,0,0,0.15)"
                        underlayColor = "rgba(0,0,0,0.15)"
                        borderless = {Platform.Version < 28 ? false : true}
                    >
                        <Icon
                            size = {24}
                            name = "right"
                            color = "#303030"
                        />
                    </TouchableRipple>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RecipeStep