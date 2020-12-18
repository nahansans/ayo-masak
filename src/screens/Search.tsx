import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { Fonts } from './../refs/Fonts'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import { Colors } from './../refs/Colors'
import { API } from './../refs/API'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableRipple } from 'react-native-paper'
import NetDisconnect from './../components/NetDisconnect'

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "Search">
}

type recipeType = {
    title: string,
    difficulty: string,
    thumb: string,
    key: string
}

const Search = (props: PropsList) => {
    const { navigation } = props
    const [searchValue, setSearchValue] = useState("")
    const [searchData, setSearchData] = useState([] as recipeType[])
    const [isLoading, setIsLoading] = useState(false)


    return (
        <SafeAreaView
            style = {{
                flex: 1,
                backgroundColor: Colors.background
            }}
        >
            <Text
                style = {{
                    fontFamily: Fonts.Lato.Bold,
                    color: Colors.primary_text,
                    fontSize: 20,
                    marginHorizontal: 20,
                    marginTop: 20
                }}
            >
                Pencarian
            </Text>
            <View
                style = {{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 20,
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: Colors.secondary_card,
                    shadowColor: Colors.secondary_text,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,

                    elevation: 11,
                }}
            >
                <Icon name = "search1" size = {20} color = {Colors.primary_text} />
                <TextInput
                    autoCapitalize = "none"
                    onChangeText = {value => {
                        setSearchValue(value)
                    }}
                    onSubmitEditing = {() => {
                        setIsLoading(true)
                        API.Search({
                            params: {
                                key: searchValue
                            },
                            callback: {
                                onSuccess: resJson => {
                                    console.log(resJson)
                                    setIsLoading(false)
                                    setSearchData(resJson.results)
                                },
                                onFailed: results => { 
                                    console.log(results)
                                    setIsLoading(false) 
                                }
                            }
                        })
                    }}
                    returnKeyType = "search"
                    style = {{
                        color: Colors.primary_text,
                        flex: 1,
                        fontFamily: Fonts.Lato.Regular,
                        padding: 0,
                        marginHorizontal: 10
                    }}
                    placeholder = "Coba cari resep..."
                    placeholderTextColor = {Colors.secondary_text}
                    value = {searchValue}
                />
            </View>
            <ScrollView>
                {
                    isLoading ?
                    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <ActivityIndicator color = {Colors.secondary_text} />
                    </View>
                    :
                    searchData.map((item, index) => {
                        return (
                            <TouchableRipple
                                key = {index}
                                rippleColor = "rgba(255,255,255,0.15)"
                                underlayColor = "rgba(255,255,255,0.15)"
                                borderless = {Platform.Version < 28 ? false : true}
                                style = {{
                                    flexDirection: "row",
                                    marginHorizontal: 20,
                                    marginBottom: 10,
                                    borderBottomColor: Colors.background,
                                    borderBottomWidth: 1,
                                    borderRadius: 8,
                                    backgroundColor: Colors.secondary_card
                                }}
                                onPress = {() => {
                                    navigation.navigate("RecipesDetail", { key: item.key, thumb: item.thumb })
                                }}
                            >
                                <>
                                    <Image
                                        source = {{uri: item.thumb}}
                                        style = {{
                                            borderRadius: 8,
                                            width: "35%",
                                            height: 100,
                                            backgroundColor: Colors.secondary_text
                                        }}
                                    />
                                    <View
                                        style = {{
                                            padding: 5,
                                            width: "65%"
                                        }}
                                    >
                                        <Text
                                            style = {{
                                                fontSize: 12,
                                                color: Colors.secondary_text,
                                                fontFamily: Fonts.Lato.Bold,
                                                paddingBottom: 10
                                            }}
                                        >
                                            {item.difficulty}
                                        </Text>
                                        <Text
                                            numberOfLines = {3}
                                            style = {{
                                                color: Colors.primary_text,
                                                fontFamily: Fonts.Lato.Bold
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                </>
                            </TouchableRipple>
                        )
                    })
                }
            </ScrollView>
            <NetDisconnect />
        </SafeAreaView>
    )
}

export default Search