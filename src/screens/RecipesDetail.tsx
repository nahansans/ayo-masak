import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, Image, SafeAreaView, Dimensions } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import { Fonts } from './../refs/Fonts'
import { API } from './../refs/API'

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "RecipesDetail">,
    route: RouteProp<NavigationType, "RecipesDetail">
}

const { width, height } = Dimensions.get("window")

const RecipesDetail = (props: PropsList) => {
    const { navigation, route } = props
    const getRecipeDetai = () => {
        API.RecipeDetail({
            params: {
                key: route.params.key
            },
            callback: {
                onSuccess: resJson => {
                    console.log(JSON.stringify(resJson, null, 4))
                },
                onFailed: results => {}
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
            <ScrollView
                style = {{
                    padding: 20
                }}
            >
                <Image
                    source = {{uri: undefined}}
                    style = {{
                        width: "100%",
                        height: 300,
                        borderRadius: 8,
                        backgroundColor: "dimgray"
                    }}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipesDetail