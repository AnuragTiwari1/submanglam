// @flow

import * as React from "react"
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native"
import FastImage from "react-native-fast-image"
import { PanGestureHandler, TouchableOpacity } from "react-native-gesture-handler"
import AntIcons from "react-native-vector-icons/AntDesign"
import { SharedElement } from "react-navigation-shared-element"
import { TabBar, Text } from "../../../components"
import { spacing } from "../../../theme"
import { IUserStory } from "../../types"

const { width } = Dimensions.get("window")
export interface StoryProps {
  story: IUserStory
}

const imgUrl = "https://i.pinimg.com/564x/c1/e1/50/c1e150a28e728df06b9c49b5e735b2ee.jpg"
const imageWidth = width * 0.8
const scrollOffset = -150

// https://i.pinimg.com/originals/e0/8a/07/e08a0787ab994363d58162b7e58e217d.jpg
// https://i.pinimg.com/originals/11/9a/4b/119a4b42d90bce485c9230ee1e439f34.jpg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: `${spacing[1]}%`,
    paddingBottom: spacing[1],
  },
  details: {
    flex: 1,
    alignItems: "center",
  },
  heroContainer: {
    borderWidth: spacing[2],
    borderColor: "#FFF",
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
  },
  heroImageContainer: {
    alignItems: "center",
    elevation: 4,
    flex: 2,
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    padding: spacing[4],
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing[3],
  },
  iconRowContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
})

const Story: React.FunctionComponent<StoryProps> = (props) => {
  const transY = new Animated.Value(0)

  const animatedOpacity = transY.interpolate({
    inputRange: [-200, 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const { name, height, weight, profession, age } = props.story.basicInfo

  const handleGesture = Animated.event([{ nativeEvent: { translationY: transY } }])

  return (
    <ImageBackground
      source={props.story.source}
      style={{ width: "100%", height: "100%" }}
      blurRadius={1.2}
    >
      <View style={styles.container}>
        <View style={styles.heroImageContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: transY.interpolate({
                    inputRange: [-400, 0],
                    outputRange: [1.5, 1],
                    extrapolate: "clamp",
                  }),
                },
                {
                  translateY: transY.interpolate({
                    inputRange: [-400, 0, 400],
                    outputRange: [100, 0, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <SharedElement id={"someRandomId"}>
              <Image
                style={styles.heroContainer}
                source={props.story.source}
                resizeMode={FastImage.resizeMode.cover}
              />
            </SharedElement>
          </Animated.View>

          <Animated.View style={[styles.iconRowContainer, { opacity: animatedOpacity }]}>
            <TouchableOpacity style={styles.buttonContainer}>
              <AntIcons name="close" size={35} color={"red"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <AntIcons name="heart" size={35} color={"red"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <AntIcons name="pushpin" size={35} color={"red"} />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={(e) => {
            const hasEnded = e.nativeEvent.state === 5
            if (hasEnded) {
              if (e.nativeEvent.translationY < scrollOffset) {
                transY.setValue(0)
                props.navigateTo("demo")
                return null
              }
              transY.setValue(0)
            }
          }}
        >
          <Animated.View style={[styles.details, { opacity: animatedOpacity }]}>
            <Text preset={["header", "white"]}>
              {name} <Text>{age}</Text>
            </Text>
            <Text preset="dullWhite">
              {weight} kg, {height.foot}"{height.inch}'
            </Text>
            <Text preset="dullWhite">{profession}</Text>

            <View style={{ marginTop: `${spacing[2]}%`, alignItems: "center" }}>
              <AntIcons name="up" size={15} color={"white"} />
              <Text preset={["white", "small"]}>Swipe up to know more</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </ImageBackground>
  )
}

export default Story
