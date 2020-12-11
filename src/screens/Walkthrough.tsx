import React, { useRef, useState } from 'react'
import { View, Image, Text, FlatList, Animated, Dimensions, TouchableOpacity } from 'react-native'
import { Fonts } from './../refs/Fonts'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import Indicator from './../components/Indicator'


type PropsList = {
    navigation: StackNavigationProp<NavigationType, "Walkthrough">,
    route: RouteProp<NavigationType, "Walkthrough">
}

const DATA = [
    {
        key: 0,
        image: `https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80`,
        description: `Temukan resep untuk sarapan Anda untuk memulai hari yang sempurna.`
    },
    {
        key: 1,
        image: `https://images.unsplash.com/photo-1547592180-85f173990554?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80`,
        description: `Bergaul dengan pecinta makanan di sekitar Anda, undang mereka untuk mencicipi.`
    },
    {
        key: 2,
        image: `https://images.unsplash.com/photo-1528712306091-ed0763094c98?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=380&q=80`,
        description: `Temukan semua resep memasak dari seluruh dunia.`
    }
]

const { width, height } = Dimensions.get(`screen`)

const Walkthrough = (props: PropsList) => {
    const ScrollX = useRef(new Animated.Value(0)).current
    return (
        <View style = {{ flex: 1, alignItems: `center`, backgroundColor: "black" }} >
            <Animated.FlatList
                data = {DATA}
                keyExtractor = {(item) => String(item.key)}
                horizontal
                scrollEventThrottle = {16}
                onScroll = {Animated.event(
                    [{nativeEvent: {contentOffset: {x: ScrollX}}}],
                    {useNativeDriver: true}
                )}
                pagingEnabled
                showsHorizontalScrollIndicator = {false}
                renderItem = {({item, index}) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ]

                    const translateXImage = ScrollX.interpolate({
                        inputRange,
                        outputRange: [
                            -width, 0, width
                        ]
                    })

                    const opacityImage = ScrollX.interpolate({
                        inputRange: [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ],
                        outputRange: [
                            0, 1, 0
                        ]
                    })
                    const translateX = ScrollX.interpolate({
                        inputRange,
                        outputRange: [
                            -height, 0, height
                        ]
                    })
                    const opacity = ScrollX.interpolate({
                        inputRange,
                        outputRange: [
                            0, 1, 0
                        ]
                    })

                    return (
                        <>
                            <View style = {{ width, alignItems: `center` }} >
                                <View style = {{ flex: 1}} >
                                    <Animated.View
                                        style = {{
                                            width: width,
                                            height: height,
                                            overflow: `hidden`
                                            // padding: 20
                                        }}
                                    >
                                        <Animated.Image
                                            source = {{uri: item.image}}
                                            style = {{
                                                width: "100%",
                                                height: "100%",
                                                // borderRadius: height,
                                                transform: [{ translateX: translateXImage }],
                                                opacity: opacityImage
                                            }}
                                        />
                                    </Animated.View>
                                    <LinearGradient
                                        colors = {["rgba(0,0,0,0.0)","rgba(0,0,0,0.75)"]}
                                        style = {{
                                            position: "absolute",
                                            top: 0, left: 0, bottom: 0, right: 0,
                                            // opacity: 0.8
                                        }}
                                    />
                                    <Animated.Text
                                        style = {{
                                            fontFamily: Fonts.Lato.Bold,
                                            fontSize: 24,
                                            textAlign: `center`,
                                            transform: [{ translateX }],
                                            opacity,
                                            color: "#fff",
                                            position: "absolute",
                                            top: height * 0.65
                                        }}
                                    >
                                        {item.description}
                                    </Animated.Text>
                                </View>
                            </View>
                        </>
                    )
                }}
            />
            <View style = {{ position: "absolute", top: height * 0.75 }} >
                <View style = {{ margin: 20, alignSelf: "center" }} >
                    <Indicator ScrollX = {ScrollX} data = {DATA} color = "#fff" />
                </View>
                <TouchableOpacity
                    activeOpacity = {0.7}
                    style = {{
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: `#fff`,
                        margin: 10,
                        marginBottom: 35,
                        borderRadius: 8,
                        alignSelf: "center"
                    }}
                    onPress = {async() => {
                        await AsyncStorage.setItem('isWalkthrough', 'yes')
                        props.navigation.replace("BottomTab")
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: Fonts.Lato.Bold,
                            color: `#fff`,
                            fontSize: 16
                        }}
                    >
                        Mulai
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Walkthrough