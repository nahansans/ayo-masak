import React, { useEffect } from 'react'
import { View, Text, Image, Animated, ScrollView, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { API } from './../refs/API';
import { Fonts } from './../refs/Fonts';
import { Colors } from './../refs/Colors';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import { TouchableOpacity } from 'react-native-gesture-handler';

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "Home">,
    route: RouteProp<NavigationType, "Home">
}

type receipesType = {
    title: string,
    thumb: string,
    key: string,
    times: string,
    portion: string,
    dificulty: string
}

const Home = (props: PropsList) => {
    useEffect(() => {
        API.RecipesByPage({
            params: {
                page: 1
            },
            callback: {
                onSuccess: resJson => {
                },
                onFailed: results => {
                }
            }
        })
    }, [])
    return (
        <SafeAreaView
            style = {{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <TouchableOpacity
                style = {{
                    flexDirection: "row",
                    padding: 10,
                    margin: 10,
                    borderRadius: 8,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "gray",
                    borderWidth: 1
                }}
            >
                <Icon size = {15} name = "search" color = "gray" />
                <Text
                    style = {{
                        marginLeft: 10,
                        fontFamily: Fonts.Lato.Regular,
                        color: "gray"
                    }}
                >
                    Search
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home
