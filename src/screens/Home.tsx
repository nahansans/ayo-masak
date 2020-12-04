import React, { useEffect, useState } from 'react'
import { View, Text, Image, Animated, ScrollView, SafeAreaView, FlatList, Dimensions } from 'react-native'
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

type categoriesType = {
    category: string,
    key: string,
    url: string
}

const { width, height } = Dimensions.get("window")

const Home = (props: PropsList) => {
    useEffect(() => {
        getCategories()
    }, [])
    const [categories, setCategories] = useState([] as categoriesType[])
    const getCategories = () => {
        API.CategoryRecipes({
            callback: {
                onSuccess: resJson => {
                    console.log(JSON.stringify(resJson.results, null, 4))
                    setCategories(resJson.results)
                },
                onFailed: results => {
                }
            }
        })
    }
    return (
        <SafeAreaView
            style = {{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <Text
                style = {{
                    fontFamily: Fonts.Lato.Bold,
                    fontSize: 20,
                    margin: 20,
                    color: "#303030"
                }}
            >
                Categories
            </Text>
            <View style = {{ flexDirection: "row" }} >
                <View
                    style = {{
                        height: 200,
                        width: width - 80,
                        backgroundColor: "gainsboro",
                        borderRadius: 8,
                        marginLeft: 20,
                    }}
                />
                <View
                    style = {{
                        height: 200,
                        width: width - 80,
                        backgroundColor: "gainsboro",
                        borderRadius: 8,
                        marginLeft: 20,
                        transform: [{scale: 0.93}]
                    }}
                />
            </View>

            <Text
                style = {{
                    fontFamily: Fonts.Lato.Bold,
                    fontSize: 20,
                    margin: 20,
                    color: "#303030"
                }}
            >
                Recipes
            </Text>
            <View style = {{ flexDirection: "row", flexWrap: "wrap" }} >
                <View
                    style = {{
                        height: 200,
                        width: width / 2 - 30,
                        backgroundColor: "gainsboro",
                        borderRadius: 8,
                        marginLeft: 20,
                        marginRight: 10,
                        marginBottom: 20
                    }}
                />
                <View
                    style = {{
                        height: 200,
                        width: width / 2 - 30,
                        backgroundColor: "gainsboro",
                        borderRadius: 8,
                        marginLeft: 10,
                        marginRight: 20,
                        marginBottom: 20
                    }}
                />
                <View
                    style = {{
                        height: 200,
                        width: width / 2 - 30,
                        backgroundColor: "gainsboro",
                        borderRadius: 8,
                        marginLeft: 20,
                        marginRight: 10,
                        marginBottom: 20
                    }}
                />
                <View
                    style = {{
                        height: 200,
                        width: width / 2 - 30,
                        backgroundColor: "gainsboro",
                        borderRadius: 8,
                        marginLeft: 10,
                        marginRight: 20,
                        marginBottom: 20
                    }}
                />
            </View>
        </SafeAreaView>
    )

}

export default Home
