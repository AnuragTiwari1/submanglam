import * as React from "react"
import { Dimensions, Image, StyleSheet, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { TouchableWithoutFeedback, FlatList } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import Carousel, { CarouselStatic } from "react-native-snap-carousel"
import { NavigationInjectedProps } from "react-navigation"
import BottomSheet from "reanimated-bottom-sheet"
import { spacing, color } from "../../theme"
import {
  Text,
  LocationIcon,
  IconSize,
  OfficeBag,
  EducationCap,
  BalanceScale,
  HomeModern,
  Hobbies,
  Face,
  Dollar,
  HeartIcon,
  Report,
  SendIcon,
} from "../../components"
import { SharedElement } from "react-navigation-shared-element"

const { width, height } = Dimensions.get("window")
export interface DemoScreenProps extends NavigationInjectedProps<{}> {}

const imgList = [
  "https://i.pinimg.com/564x/c1/e1/50/c1e150a28e728df06b9c49b5e735b2ee.jpg",
  "https://i.pinimg.com/564x/6a/dd/e2/6adde23f402617ffd47ac38d161ffac4.jpg",
  "https://i.pinimg.com/564x/05/8b/0e/058b0ea70bee2dc34ad8a2ef9c959f83.jpg",
]

const AnimatedView = Animated.View

const snapPoints = ["30%", "70%"]

const DemoScreen: React.FunctionComponent<DemoScreenProps> = props => {
  const _carousel = React.useRef<CarouselStatic<string> | null>(null)
  const bottomSheetRef = React.createRef<BottomSheet>()
  const fall = new Animated.Value(1)

  const renderContent = () => {
    return (
      <View style={styles.panel}>
        <Text preset={["xLarge", "fontAnson"]}>Erzza Scarlet - 24</Text>
        <Text style={{ color: color.palette.darkGrey }} preset={["fontAnson"]}>
          65kg, 5"11'
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing[1] }}>
          <LocationIcon color={color.palette.darkGrey} size={IconSize.small} />
          <Text preset={["muted", "small"]}>{`\xa0 Bengaluru, India`}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing[1] }}>
          <OfficeBag color={color.palette.darkGrey} size={IconSize.small - 1} />
          <Text preset={["muted", "small"]}>{`\xa0 Software Developer`}</Text>
        </View>
        <Text preset={["paragraph"]} style={{ marginTop: `${spacing[1]}%` }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum interdum felis,
          sit amet condimentum nunc laoreet eget. Phasellus venenatis massa cursus odio feugiat, et
          venenatis nunc scelerisque. Aliquam faucibus vehicula felis quis porttitor. Integer
          convallis nibh quis urna lobortis finibus.
        </Text>
        <Matches
          traits={{
            maritalStatus: "Married Before",
            education: "Graduate",
            native: "Patna, Bihar",
            hobbies: "Travelling",
            complexion: "Fair",
            salary: "20k/Month",
          }}
        />
        <AllDetails />
      </View>
    )
  }

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={[styles.headerBackground]}>{renderHandler()}</View>
        </View>
      </View>
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

  const renderBottomButtons = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [1, 0],
    })

    const translateFromBottom = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0, 50],
    })

    return (
      <AnimatedView
        pointerEvents="none"
        style={{
          zIndex: 1000,
          position: "absolute",
          bottom: 0,
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
          width: "70%",
          right: "15%",
          paddingBottom: `${spacing[1]}%`,
          opacity: animatedShadowOpacity,
          translateY: translateFromBottom,
        }}
      >
        <View
          style={[
            styles.traitIcon,
            {
              width: width * 0.16,
              height: width * 0.16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            },
          ]}
        >
          <SendIcon color={"#0088cc"} />
        </View>
        <View
          style={[
            styles.traitIcon,
            {
              width: width * 0.16,
              height: width * 0.16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            },
          ]}
        >
          <HeartIcon />
        </View>
        <View
          style={[
            styles.traitIcon,
            {
              width: width * 0.16,
              height: width * 0.16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            },
          ]}
        >
          <Report size={32} color={color.palette.blue} style={{ marginTop: spacing[2] }} />
        </View>
      </AnimatedView>
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
          onTouchMove={() => bottomSheetRef.current!.snapTo(0)}
          data={imgList}
          renderItem={({ item, index }) => {
            return (
              <SharedElement id={"someRandomId"}>
                <FastImage
                  style={{ width: width, height: height * 0.7 }}
                  source={{
                    uri: item,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </SharedElement>
            )
          }}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
      {renderShadow()}
      {renderBottomButtons()}
    </View>
  )
}

DemoScreen.sharedElements = (navigation, otherNavigation, showing) => {
  return ["someRandomId"]
}

const Matches = ({ traits }: { traits: any }) => {
  return (
    <View style={{ backgroundColor: "#fff", marginTop: `${spacing[1]}%` }}>
      <Text preset={["header", "large"]}>Matches ({Object.keys(traits).length || 0})</Text>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: `${spacing[3]}%` }}
        data={Object.keys(traits || {})}
        renderItem={({ item, index }) => {
          return (
            <View style={{ marginHorizontal: `${spacing[1]}%`, flex: 1 }}>
              <View
                style={[
                  styles.traitIcon,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    width: width * 0.22,
                    height: width * 0.22,
                  },
                ]}
              >
                {
                  {
                    education: (
                      <EducationCap size={32} color={"orange"} style={{ marginTop: spacing[2] }} />
                    ),
                    native: (
                      <HomeModern size={38} color={"cyan"} style={{ marginTop: spacing[2] }} />
                    ),
                    maritalStatus: (
                      <BalanceScale size={32} color={"red"} style={{ marginTop: spacing[2] }} />
                    ),
                    hobbies: <Hobbies size={32} color={"blue"} style={{ marginTop: spacing[2] }} />,
                    complexion: (
                      <Face size={38} color={"#F2C280"} style={{ marginTop: spacing[2] }} />
                    ),
                    salary: <Dollar size={32} color={"pink"} style={{ marginTop: spacing[2] }} />,
                  }[item]
                }
              </View>
              <Text preset={["center", "small", "muted"]} style={{ marginTop: spacing[2] }}>
                {traits[item]}
              </Text>
            </View>
          )
        }}
        numColumns={3}
      />
    </View>
  )
}

const AllDetails = () => {
  return (
    <View style={styles.panel}>
      <Text preset={["header", "large"]}>Profile Details</Text>
      <View style={{ paddingStart: `2%`, marginBottom: spacing[8] }}>
        <Text preset={["bold", "fontAnson", "large", "underline"]}>Appearance</Text>
        <View style={styles.section}>
          <Text>
            <Text preset="bold">Complexation</Text>: Fair
          </Text>
          <Text>
            <Text preset="bold">Height</Text>: 5"11'
          </Text>
          <Text>
            <Text preset="bold">Weight</Text>: 65kg
          </Text>
          <Text>
            <Text preset="bold">Age</Text>: 24
          </Text>
          <Text>
            <Text preset="bold">Physical Disabilities</Text>: N/A
          </Text>
        </View>
        <Text preset={["bold", "fontAnson", "large", "underline"]}>Profession</Text>
        <View style={styles.section}>
          <Text>
            <Text preset="bold">Job Title</Text>: Software Developer
          </Text>
          <Text>
            <Text preset="bold">For</Text>: Tik Tok Pvt. Ltd.
          </Text>
          <Text>
            <Text preset="bold">At</Text>: Bengaluru,India
          </Text>
          <Text>
            <Text preset="bold">Salary</Text>: 20k/Month
          </Text>
        </View>
        <Text preset={["bold", "fontAnson", "large", "underline"]}>Education</Text>
        <View style={styles.section}>
          <Text>
            <Text preset="bold">Highest Education</Text>: Graduate, Mechanical Engineering
          </Text>
          <Text>
            <Text preset="bold">College/University</Text>: Pune University
          </Text>
          <Text>
            <Text preset="bold">Attended From</Text>: 2014 to 2018
          </Text>
        </View>
        <Text preset={["bold", "fontAnson", "large", "underline"]}>Marital Status</Text>
        <View style={styles.section}>
          <Text>
            <Text preset="bold">Marital Status</Text>: Married Before
          </Text>
          <Text>Have a 5 year old Daughter</Text>
        </View>
        <Text preset={["bold", "fontAnson", "large", "underline"]}>Family Background</Text>
        <View style={styles.section}>
          <Text>
            <Text preset="bold">Father Profession</Text>: Surgeon at AIIMS Delhi
          </Text>
          <Text>
            <Text preset="bold">Mother Profession</Text>: Lecturer at IIT Delhi
          </Text>
          <Text>
            <Text preset="bold">Contact</Text>: (+91)-9607155846
          </Text>
        </View>
      </View>
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

  // user details (content)
  panel: {
    paddingHorizontal: `${spacing[1]}%`,
    backgroundColor: "#fff",
  },

  traitIcon: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.4,
    borderRadius: width * 0.11,
    elevation: 5,
  },
  section: {
    marginTop: spacing[1],
    borderLeftWidth: 0.8,
    borderColor: color.palette.lightGrey,
    paddingStart: `${spacing[1]}%`,
  },
})

export { DemoScreen }
