import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View, TouchableOpacity, LayoutAnimation } from "react-native"
import { Screen, Text, HeartIcon } from "../components"
import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProp } from "react-navigation"
import { trimEmail } from "../utils/links"
import { PreferenceSnapshot } from "../models/preference"

export interface AccountScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: "#f5f5f5",
  paddingTop: StatusBar.currentHeight,
  flexGrow: 1,
}

export const AccountScreen: React.FunctionComponent<AccountScreenProps> = observer((props) => {
  const { authStore, preferenceStore } = useStores()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset={["header", "center"]}>Settings</Text>
      <Text preset={["center", "small"]}>tinker the app according to your needs</Text>
      <StatusBar barStyle="dark-content" />
      <Ads />
      <AccountSection email={authStore.email} />
      <PreferenceSection {...preferenceStore} />
      <ContactUs />
      <Legal />
      <Text
        style={{ padding: spacing[1], marginBottom: spacing[3] }}
        preset={["bold", "center", "primary"]}
      >
        Sign out
      </Text>
    </Screen>
  )
})

const Legal = () => {
  return (
    <View style={{ margin: spacing[3] }}>
      <Text preset={["bold", "large"]}>Legal</Text>
      <View
        style={{
          backgroundColor: color.background,
          borderRadius: spacing[1],
          marginVertical: spacing[3],
          padding: spacing[3],
        }}
      >
        <Text style={{ padding: spacing[3] }}>Licenses</Text>
        <Text style={{ padding: spacing[3] }}>Privacy Policy</Text>
        <Text style={{ padding: spacing[3] }}>Terms of Services</Text>
      </View>
    </View>
  )
}

const ContactUs = () => {
  return (
    <View style={{ margin: spacing[3] }}>
      <Text preset={["bold", "large"]}>Contact us</Text>
      <View
        style={{
          backgroundColor: color.background,
          borderRadius: spacing[1],
          marginVertical: spacing[3],
          padding: spacing[3],
        }}
      >
        <Text preset={["bold", "center"]}>Help & Support</Text>
      </View>
    </View>
  )
}

const EMPTY_STRING = "Not set"
const PreferenceSection = (props: PreferenceSnapshot) => {
  const [isDetailed, setIsDetailed] = React.useState(false)
  return (
    <View style={{ margin: spacing[3] }}>
      <Text preset={["bold", "large"]}>Preferences settings</Text>
      <View
        style={{
          backgroundColor: color.background,
          borderRadius: spacing[1],
          marginVertical: spacing[3],
        }}
      >
        <ExpandebleInput title="City" value={props.city || EMPTY_STRING}></ExpandebleInput>
        <ExpandebleInput title="Marital status" value={props.maritalStatus || EMPTY_STRING} />
        <ExpandebleInput title="Complexion" value={props.complexion || EMPTY_STRING} />
        <ExpandebleInput title="Marital status" value={props.maritalStatus || EMPTY_STRING} />
        {isDetailed ? (
          <View>
            <ExpandebleInput title="Age" value={props.ageTo || EMPTY_STRING} />
            <ExpandebleInput
              title="Height"
              value={props.maxHeight || EMPTY_STRING}
            ></ExpandebleInput>
            <ExpandebleInput title="Education" value={props.education || EMPTY_STRING} />
            <ExpandebleInput title="Religon" value={props.religion || EMPTY_STRING} />
          </View>
        ) : null}
      </View>
      <Text
        preset={["muted"]}
        style={{ alignSelf: "flex-end" }}
        onPress={() => {
          LayoutAnimation.configureNext(
            LayoutAnimation.create(
              500,
              LayoutAnimation.Types.easeInEaseOut,
              LayoutAnimation.Properties.scaleY,
            ),
          )
          setIsDetailed(!isDetailed)
        }}
      >
        {isDetailed ? "view less" : "view more"}
      </Text>
    </View>
  )
}

const AccountSection = ({ email }) => {
  return (
    <View style={{ margin: spacing[3] }}>
      <Text preset={["bold", "large"]}>Account settings</Text>
      <View
        style={{
          backgroundColor: color.background,
          borderRadius: spacing[1],
          marginVertical: spacing[3],
        }}
      >
        <ExpandebleInput title="Email" value={trimEmail(email)}></ExpandebleInput>
        <ExpandebleInput title="Password" value={"*****"} />
      </View>
    </View>
  )
}

const ExpandebleInput = ({ title, value }) => {
  const [isExpanded, setExpanded] = React.useState(false)
  return (
    <TouchableOpacity onPress={() => console.log("this will be logged")}>
      <View
        pointerEvents="none"
        style={{ flexDirection: "row", padding: spacing[3], justifyContent: "space-between" }}
      >
        <Text>{title}</Text>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Ads = () => {
  return (
    <View
      style={{
        padding: spacing[3],
        margin: spacing[3],
        backgroundColor: color.background,
        borderRadius: spacing[3],
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <HeartIcon color="lightgreen" size={25} style={{ marginHorizontal: spacing[4] }} />
        <Text preset={["text", "bold"]}>Increase Your Chances</Text>
      </View>
      <Text preset="center">Get unlimited likes with premium</Text>
    </View>
  )
}
