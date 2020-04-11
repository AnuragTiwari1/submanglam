import { createStackNavigator } from "react-navigation-stack"
import { PrimaryNavigator } from "./primary-navigator"
import { AuthNavigator } from "./auth-navigator"
import { CreateProfileNavigator } from "./createProfile-navigator"
import { createSwitchNavigator } from "react-navigation"

export const RootNavigator = createSwitchNavigator(
  {
    authStack: { screen: AuthNavigator },
    primaryStack: { screen: PrimaryNavigator },
    createProfileStack: { screen: CreateProfileNavigator },
  },
  {
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "authStack",
  },
)
