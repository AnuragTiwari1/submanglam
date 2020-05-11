import * as React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import FastImage from "react-native-fast-image"
import { FlatList } from "react-native-gesture-handler"
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
  EmptyPreference,
  BloodIcon,
} from "../../components"
import { SharedElement } from "react-navigation-shared-element"
import { useStores } from "../../models/root-store"
import { observer } from "mobx-react-lite"
import { useFetch } from "use-fetch-lib"
import { PersonDetailsSnapshot } from "../../models/person-details"
import { getProfilePic } from "../../utils/links"
import { getSnapshot } from "mobx-state-tree"
import { SALARY } from "../../constants"

const { width, height } = Dimensions.get("window")
export interface DemoScreenProps extends NavigationInjectedProps<{}> {}

const AnimatedView = Animated.View

const snapPoints = ["30%", "70%"]

const DemoScreen: React.FunctionComponent<DemoScreenProps> = observer(() => {
  const _carousel = React.useRef<CarouselStatic<string> | null>(null)
  const bottomSheetRef = React.createRef<BottomSheet>()
  const fall = new Animated.Value(1)
  const { personStore } = useStores()

  const imgList = [
    personStore.photo || personStore.profilepic,
    personStore.photo2,
    personStore.photo3,
    personStore.photo4,
    personStore.photo5,
  ]
    .filter((e) => e !== "profile.png")
    .map((e) => getProfilePic(e))

  const [{ data, status }] = useFetch({
    url: `/get/person?id=${personStore.id}`,
    dependencies: [personStore.id],
    method: "get",
    shouldDispatch: true,
  })

  React.useEffect(() => {
    if (status.isFulfilled) {
      personStore.updateProfile(data.person)
    }
  }, [status])

  const renderContent = () => {
    return (
      <View style={styles.panel}>
        <Text preset={["xLarge", "fontAnson"]}>
          {personStore.name} - {personStore.age}
        </Text>
        <Text preset={["fontAnson"]}>
          {personStore.weight}kg, {`${personStore.height}`.split(".")[0]}"{" "}
          {`${personStore.height}`.split(".")?.[1] || 0}'{" "}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing[1] }}>
          <LocationIcon color={color.palette.darkGrey} size={IconSize.small} />
          <Text preset={[ "small"]}>{`\xa0 ${personStore.native}, India`}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing[1] }}>
          <OfficeBag color={color.palette.darkGrey} size={IconSize.small - 1} />
          <Text preset={["small"]}>{`\xa0  ${personStore.profession}`}</Text>
        </View>
        <Text preset={["paragraph"]} style={{ marginTop: `${spacing[1]}%`,color:'black' }}>
          {personStore.expectations}
        </Text>
        {/*
			see this is how the prop should look
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
		  */}
        <EmptyPreference message="Set your preference to know your compatibilty. We won't disappoint you." />

        <AllDetails {...getSnapshot(personStore)} />
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
          ref={(c) => {
            _carousel.current = c
          }}
          onTouchMove={() => bottomSheetRef.current!.snapTo(0)}
          data={imgList}
          renderItem={({ item, index }) => {
            return (
              <SharedElement id={personStore.id}>
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
})

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

const AllDetails = (props: PersonDetailsSnapshot) => {
  return (
    <View style={styles.panel}>
      <View style={styles.charaterRow}>
        <BalanceScale style={{ flex: 1 }} size={23} />
        <Text style={{ flex: 4 }} preset={["text"]}>
          {props.maritalstatus}
        </Text>
      </View>
      <View style={styles.charaterRow}>
        <Face style={{ flex: 1 }} size={23} color="black"/>
        <Text style={{ flex: 4 }} preset={["text"]}>
          {props.complexion}
        </Text>
      </View>
      <View style={styles.charaterRow}>
        <Hobbies style={{ flex: 1 }} size={23} />
        <Text style={{ flex: 4 }} preset={["text"]}>
          {props.hobbies}
        </Text>
      </View>
      <View style={styles.charaterRow}>
        <EducationCap style={{ flex: 1 }} size={23} />
        <Text style={{ flex: 4 }} preset={["text"]}>
          {props.education}
        </Text>
      </View>
      <View style={styles.charaterRow}>
        <Dollar style={{ flex: 1 }} size={23} />
        <Text style={{ flex: 4 }} preset={["text"]}>
          {SALARY.find((e) => e.value === props.salary)?.label}
        </Text>
      </View>
      <View style={styles.charaterRow}>
        <OfficeBag style={{ flex: 1 }} size={23} />
        <Text style={{ flex: 4 }} preset={["text"]}>
          {props.officename}
        </Text>
			</View>
				<View style={styles.charaterRow}>
        <BloodIcon style={{ flex: 1 }} size={23} />
        <Text style={{ flex: 4 }} preset={["text"]}>
          {props.bloodgroup}
        </Text>
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
	  paddingBottom:spacing[7]
  },

  charaterRow: {
    flexDirection: "row",
    marginTop: spacing[3],
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
