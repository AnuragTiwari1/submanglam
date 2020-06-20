import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View } from "react-native"
import { Screen, Text, HeartIcon, ExpandebleInput, ExpandAnimation } from "../components"
import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProp } from "react-navigation"
import { trimEmail } from "../utils/links"
import { PreferenceSnapshot } from "../models/preference"
import { TextInput, Button } from "react-native-paper"
import { useFetch } from "use-fetch-lib"

export interface AccountScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  backgroundColor: "#f5f5f5",
  paddingTop: StatusBar.currentHeight,
  flexGrow: 1,
}

export const AccountScreen: React.FunctionComponent<AccountScreenProps> = observer(() => {
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
        style={{
          padding: spacing[1],
          marginBottom: spacing[3],
        }}
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
            <ExpandebleInput
              title="Age"
              value={props.ageTo ? `${props.ageFrom}-${props.ageTo}` : EMPTY_STRING}
            />
            <ExpandebleInput
              title="Height"
              value={props.maxHeight ? `${props.minHeight}-${props.maxHeight}` : EMPTY_STRING}
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
          ExpandAnimation()
          setIsDetailed(!isDetailed)
        }}
      >
        {isDetailed ? "view less" : "view more"}
      </Text>
    </View>
  )
}

const AccountSection = ({ email }) => {
  const [newPassword, setNewPassword] = React.useState("")
  const [{ status }, services] = useFetch({ url: "/set/password", method: "post" })

  const passwordExpandableRef = React.useRef(null)

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
        <ExpandebleInput
          title="Password"
          ref={passwordExpandableRef}
          value={"*****"}
          onStateChange={() => setNewPassword("")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              label="New Password"
              style={{ height: 50, margin: spacing[3], flex: 1 }}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button
              compact={true}
              onPress={() => {
                if (newPassword) {
                  passwordExpandableRef.current.setExpanded(false)
                }
              }}
            >
              done
            </Button>
          </View>
        </ExpandebleInput>
      </View>
    </View>
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
