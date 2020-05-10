import * as React from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProp } from "react-navigation"
import { HeartIcon, Text, SettingsIcon, EditIcon, AddImages } from "../components"
import Svg, { Circle } from "react-native-svg"
import { getProfilePic } from "../utils/links"
import { useFetch } from "use-fetch-lib"
import { applySnapshot } from "mobx-state-tree"

const { width } = Dimensions.get("window")
export interface ProfileScreenProps {
  navigation: NavigationScreenProp<{}>
}

const imageWidth = width * 0.48 // this will take 1/3  of screen
const iconWidth = 65

export const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = observer((props) => {
  const { userProfile, authStore, navigationStore, userProfileForm } = useStores()
  const [{ data, status }] = useFetch({
    url: "/get/myprofile",
    method: "get",
    cache: true,
    shouldDispatch: true,
  })

  React.useEffect(() => {
    if (status.isFulfilled && data) {
      userProfile.updateProfile(data.profile)
    }
  }, [status])

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.heroImageContainer}>
          <Image
            style={styles.heroContainer}
            source={{
              uri: getProfilePic(userProfile.profilepic),
            }}
            resizeMode="cover"
          />
          <Text preset="header">
            {authStore.firstName}, {userProfile.age}
          </Text>
          <Text>
            {userProfile.profession}, {userProfile.location}
          </Text>
        </View>
        <View
          style={{
            width: width * 0.8,
            height: width * 0.8,
            marginTop: spacing[2],
            borderColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              ...styles.iconContainerCommon,
              top: width * 0.1,
            }}
          >
            <View style={[styles.iconContainer, { backgroundColor: color.palette.blue }]}>
              <AddImages size={30} color={"#ffffff"} />
            </View>
            <Text preset="small">Add Media</Text>
          </View>
          <View
            style={{
              ...styles.iconContainerCommon,
              bottom: width * 0.6,
              right: 0,
            }}
          >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                applySnapshot(userProfileForm, userProfile)
                navigationStore.navigateTo("updateProfile")
              }}
            >
              <EditIcon size={30} color={color.palette.lightGrey} />
            </TouchableOpacity>
            <Text preset="small">Edit Info</Text>
          </View>
          <View
            style={{
              ...styles.iconContainerCommon,
              bottom: width * 0.6,
              left: 0,
            }}
          >
            <View style={styles.iconContainer}>
              <SettingsIcon size={45} color={color.palette.lightGrey} />
            </View>
            <Text preset="small">Settings</Text>
          </View>
        </View>
      </View>
      <CircleCurve />
      <Offers />
    </View>
  )
})

const CircleCurve = () => {
  return (
    <Svg height="100" width={width}>
      <Circle
        cx={width / 2}
        cy={`-${898 - 24 + 2}`}
        r="898.5"
        fill="#FFFFFF"
        stroke="#C5CACD"
        strokeWidth="2"
      />
    </Svg>
  )
}

// this will be carousal but i am in hurry
const Offers = () => {
  return <OfferCard />
}

const OfferCard = () => {
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <HeartIcon color="lightgreen" size={25} style={{ marginHorizontal: spacing[4] }} />
        <Text preset={["text", "bold"]}>Increase Your Chances</Text>
      </View>
      <Text preset="center">Get unlimited likes with premium</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing[1],
    backgroundColor: color.palette.offWhite,
  },
  details: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  heroContainer: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
  },
  heroImageContainer: {
    alignItems: "center",
    elevation: 4,
    justifyContent: "center",
    marginVertical: spacing[2],
  },
  iconContainerCommon: {
    position: "absolute",
  },

  iconContainer: {
    backgroundColor: color.palette.offWhite,
    alignItems: "center",
    justifyContent: "center",
    height: iconWidth,
    width: iconWidth,
    borderRadius: iconWidth / 2,
  },
})
