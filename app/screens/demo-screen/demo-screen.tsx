import * as React from "react"
import { Dimensions, Image, StyleSheet, Text, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import Carousel, { CarouselStatic } from "react-native-snap-carousel"
import { NavigationInjectedProps } from "react-navigation"
import BottomSheet from "reanimated-bottom-sheet"

const { width, height } = Dimensions.get("window")
const FULL: ViewStyle = { flex: 1 }
const imageWidth = width
export interface DemoScreenProps extends NavigationInjectedProps<{}> {}

const imgList = [
  "https://i.pinimg.com/564x/6a/dd/e2/6adde23f402617ffd47ac38d161ffac4.jpg",
  "https://i.pinimg.com/564x/c1/e1/50/c1e150a28e728df06b9c49b5e735b2ee.jpg",
  "https://i.pinimg.com/564x/05/8b/0e/058b0ea70bee2dc34ad8a2ef9c959f83.jpg",
]

// export const DemoScreen: React.FunctionComponent<DemoScreenProps> = props => {
//   const _carousel = React.useRef<CarouselStatic<string> | null>(null)
//   return (
//
//   )
// }

const AnimatedView = Animated.View
const AnimatedBlurView = Animated.createAnimatedComponent(View)

const snapPoints = ["30%", "70%"]

const DemoScreen: React.FunctionComponent<DemoScreenProps> = props => {
  const _carousel = React.useRef<CarouselStatic<string> | null>(null)
  const bottomSheetRef = React.createRef<BottomSheet>()
  let fall = new Animated.Value(1)

  const onFlatListTouchStart = () => {
    bottomSheetRef.current!.snapTo(0)
  }

  const onHeaderPress = () => {
    bottomSheetRef.current!.snapTo(1)
  }

  const renderContent = () => {
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>San Francisco Airport</Text>
        <Text style={styles.panelSubtitle}>International Airport - 40 miles away</Text>
        <View style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Directions</Text>
        </View>
        <View style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Search Nearby</Text>
        </View>
        <Image
          style={styles.photo}
          source={{
            uri: "https://i.pinimg.com/564x/6a/dd/e2/6adde23f402617ffd47ac38d161ffac4.jpg",
          }}
        />
      </View>
    )
  }

  const renderHeader = () => {
    return (
      <TouchableWithoutFeedback key={"header-container"} onPress={onHeaderPress}>
        <View style={styles.headerContainer}>
          <View style={[styles.headerBackground]}>{renderHandler()}</View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    })

    return (
      <AnimatedView
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    )
  }

  const renderHandler = () => {
    return (
      <View style={styles.handlerContainer}>
        <View style={styles.handlerBar} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={0}
        callbackNode={fall}
        snapPoints={snapPoints}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
      <View>
        <Carousel
          ref={c => {
            _carousel.current = c
          }}
          onTouchMove={onFlatListTouchStart}
          data={imgList}
          renderItem={({ item, index }) => {
            return (
              <FastImage
                style={{ width: width, height: height * 0.7 }}
                source={{
                  uri: item,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )
          }}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
      {renderShadow()}
    </View>
  )
}

const styles = StyleSheet.create({
  // Screen
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },

  // Header
  headerContainer: {
    height: 25,
  },

  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    opacity: 1,
  },

  // Handler
  handlerContainer: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
    height: 20,
    width: 50,
  },

  handlerBar: {
    position: "absolute",
    backgroundColor: "#D1D1D6",
    top: 5,
    borderRadius: 3,
    height: 5,
    width: 50,
  },

  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#fff",
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#318bfb",
    alignItems: "center",
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30,
  },
})

export { DemoScreen }
