import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, Image, SafeAreaView, Dimensions, ActivityIndicator, Platform } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import { Fonts } from './../refs/Fonts'
import { API } from './../refs/API'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "RecipesDetail">,
    route: RouteProp<NavigationType, "RecipesDetail">
}

type needItemType = {
    item_name: string,
    thumb_item: string
}

type recipeType = {
    title: string,
    thumb: string,
    servings?: string,
    times?: string,
    dificulty?: string,
    author?: {
        user?: string,
        datePublished?: string
    },
    desc?: string,
    needItem: [],
    ingredient: [],
    step: []
}

const { width, height } = Dimensions.get("window")

const RecipesDetail = (props: PropsList) => {
    const { navigation, route } = props

    useEffect(() => {
        getRecipeDetail()
    }, [])

    const [recipe, setRecipe] = useState({} as recipeType)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getRecipeDetail = () => {
        setLoading(true)
        API.RecipeDetail({
            params: {
                key: route.params.key
            },
            callback: {
                onSuccess: resJson => {
                    setRecipe(resJson.results)
                    // console.log(JSON.stringify(resJson.results, null, 4))
                    setLoading(false)
                    setIsError(false)
                },
                onFailed: results => {
                    setLoading(false)
                    setIsError(true)
                }
            }
        })

    }
    return (
        <SafeAreaView
            style = {{
                flex: 1,
                backgroundColor: "white"
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
                onPress = {() => navigation.goBack()}
            >
                <Icon
                    size = {24}
                    name = "chevron-left"
                    color = "black"
                />
            </TouchableRipple>
            {
                loading ?
                <View
                    style = {{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator color = "dimgray" />
                </View>
                :
                (
                    isError ?
                    <View
                        style = {{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>
                            Error...
                        </Text>
                    </View>
                    :
                    <ScrollView
                        showsVerticalScrollIndicator = {false}
                        style = {{
                            paddingHorizontal: 20
                        }}
                    >
                        <Image
                            source = {{uri: recipe.thumb}}
                            style = {{
                                width: "100%",
                                height: 300,
                                borderRadius: 8,
                                backgroundColor: "dimgray"
                            }}
                        />
                        <Text
                            style = {{
                                marginTop: 20,
                                fontFamily: Fonts.Lato.Bold,
                                fontSize: 20
                            }}
                        >
                            {recipe.title}
                        </Text>
                        
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Kesulitan
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >{recipe.dificulty}</Text>

                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Waktu
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >{recipe.times}</Text>

                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Porsi
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >{recipe.servings}</Text>

                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Pembuat
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >{recipe.author?.user}</Text>

                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Diupload
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >{recipe.author?.datePublished}</Text>

                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Bahan yang dibutuhkan
                        </Text>
                        <View
                            style = {{
                                padding: 10,
                                backgroundColor: "aliceblue",
                                borderRadius: 8,
                                marginTop: 10
                            }}
                        >
                            {
                                recipe.needItem != undefined ?
                                    (recipe.needItem || []).map((item: needItemType, index) => {
                                        return (
                                            <View style = {{ marginTop: 5 }} key = {index} >
                                                <Image
                                                    source = {{uri: item.thumb_item}}
                                                    style = {{
                                                        width: width * 0.25,
                                                        height: 75,
                                                        backgroundColor: "dimgray",
                                                        borderRadius: 8
                                                    }}
                                                />
                                                <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13, marginTop: 5 }} >{item.item_name}</Text>
                                            </View>
                                        )
                                    })
                                :
                                    <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >
                                        Tidak Ada
                                    </Text>
                            }
                        </View>
                        
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Bumbu
                        </Text>
                        <View
                            style = {{
                                padding: 10,
                                backgroundColor: "aliceblue",
                                borderRadius: 8,
                                marginTop: 10
                            }}
                        >
                            {
                                recipe.ingredient != undefined ?
                                    (recipe.ingredient || []).map((item, index) => {
                                        return (
                                            <View style = {{ marginTop: 5 }} key = {index} >
                                                <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13, marginTop: 5 }} >· {item}</Text>
                                            </View>
                                        )
                                    })
                                :
                                    <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >
                                        Tidak Ada
                                    </Text>
                            }
                        </View>
                        
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: "#303030",
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Langkah-langkah
                        </Text>
                        <View
                            style = {{
                                padding: 10,
                                backgroundColor: "aliceblue",
                                borderRadius: 8,
                                marginTop: 10
                            }}
                        >
                            {
                                recipe.step != undefined ?
                                    (recipe.step || []).map((item, index) => {
                                        return (
                                            <View style = {{ marginTop: 5 }} key = {index} >
                                                <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13, marginTop: 5 }} >· {item}</Text>
                                            </View>
                                        )
                                    })
                                :
                                    <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13 }} >
                                        Tidak Ada
                                    </Text>
                            }
                        </View>
                        <View style = {{ paddingBottom: 20 }} />

                    </ScrollView>
                )
            }
        </SafeAreaView>
    )
}

export default RecipesDetail