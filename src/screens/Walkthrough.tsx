import React, { useRef } from 'react'
import { View, Image, Text, FlatList, Animated, Dimensions, TouchableOpacity } from 'react-native'
import { Fonts } from './../refs/Fonts'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'react-native/Libraries/NewAppScreen'
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
        <View style = {{ flex: 1, alignItems: `center` }} >
            <LinearGradient
                colors = {["white", "white","paleturquoise"]}
                style = {{
                    position: "absolute",
                    top: 0, left: 0, bottom: 0, right: 0,
                    // opacity: 0.8
                }}
            />
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
                    
                    const translateX = ScrollX.interpolate({
                        inputRange,
                        outputRange: [
                            -height, 0, height
                        ]
                    })
                    const translateXImage = ScrollX.interpolate({
                        inputRange,
                        outputRange: [
                            -width, 0, width
                        ]
                    })
                    const opacity = ScrollX.interpolate({
                        inputRange,
                        outputRange: [
                            0, 1, 0
                        ]
                    })

                    const opacityImage = ScrollX.interpolate({
                        inputRange: [
                            (index - 0.5) * width,
                            index * width,
                            (index + 0.5) * width
                        ],
                        outputRange: [
                            0, 1, 0
                        ]
                    })
                    return (
                        <>
                            <View style = {{ width, alignItems: `center` }} >
                                <View style = {{ flex: 0.7}} >
                                    <Animated.View
                                        style = {{
                                            width: width,
                                            height: height / 2,
                                            borderBottomLeftRadius: height / 2,
                                            overflow: `hidden`
                                            // padding: 20
                                        }}
                                    >
                                        <Animated.Image
                                            source = {{uri: item.image}}
                                            style = {{
                                                width,
                                                height: height / 2,
                                                // borderRadius: height,
                                                transform: [{ translateX: translateXImage }],
                                                opacity: opacityImage
                                            }}
                                        />
                                    </Animated.View>
                                    <Animated.Text
                                        style = {{
                                            fontFamily: Fonts.Lato.Bold,
                                            fontSize: 24,
                                            textAlign: `center`,
                                            padding: 20,
                                            transform: [{ translateX }],
                                            opacity,
                                            color: "#303030"
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
            <View style = {{ margin: 20 }} >
                <Indicator ScrollX = {ScrollX} data = {DATA} color = "#303030" />
            </View>
            <TouchableOpacity
                activeOpacity = {0.7}
                style = {{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderWidth: 2,
                    borderColor: `#303030`,
                    margin: 10,
                    marginBottom: 35,
                    borderRadius: 8
                }}
                onPress = {async() => {
                    await AsyncStorage.setItem('isWalkthrough', 'yes')
                    props.navigation.replace("Home")
                }}
            >
                <Text
                    style = {{
                        fontFamily: Fonts.Lato.Bold,
                        color: `#303030`,
                        fontSize: 16
                    }}
                >
                    Mulai
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Walkthrough