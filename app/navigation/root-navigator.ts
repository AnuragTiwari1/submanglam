import { createSwitchNavigator } from "react-navigation"
import { AuthNavigator } from "./auth-navigator"
import { CreateProfileNavigator } from "./createProfile-navigator"
import { PrimaryNavigator } from "./primary-navigator"
import { Platform, StatusBar } from "react-native"

export const RootNavigator = createSwitchNavigator(
  {
    authStack: { screen: AuthNavigator },
    primaryStack: { screen: PrimaryNavigator },
    createProfileStack: { screen: CreateProfileNavigator },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
    initialRouteName: "authStack",
  },
)
