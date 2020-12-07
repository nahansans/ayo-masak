import React from 'react'
import { View, Text, Animated, Dimensions } from 'react-native'
const { width } = Dimensions.get("window")

const Indicator = ({ScrollX, data, color}: any) => {
    return (
        <View style = {{ flexDirection: `row` }} >
            {data.map((_: any, i: number) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const scale = ScrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: `clamp`
                })
                return (
                    <Animated.View
                        key = {`indicator-${i}`}
                        style = {{
                            height: 5,
                            width: 5,
                            borderRadius: 5,
                            backgroundColor: color,
                            margin: 5,
                            transform: [{scale}]
                        }}
                    >

                    </Animated.View>
                )
            })}
        </View>
    )
}

export default Indicator