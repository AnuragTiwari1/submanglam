import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import {
  DemoScreen,
  WelcomeScreen,
  LoginScreen,
  AddPersonalDetailsScreen,
  SignupScreen,
  ProfessionalDetailsScreen,
  FamilyDetailsScreen,
  AddPictureScreen,
} from "../screens"
import { createStackNavigator } from "react-navigation-stack"
import { createSwitchNavigator } from "react-navigation"

// export const PrimaryNavigator = createSharedElementStackNavigator(
//   {
//     welcome: { screen: WelcomeScreen },
//     demo: { screen: DemoScreen },
//   },
//   {
//     initialRouteName: "welcome",
//     headerMode: "none",
//   },
// )

// /**
//  * A list of routes from which we're allowed to leave the app when
//  * the user presses the back button on Android.
//  *
//  * Anything not on this list will be a standard `back` action in
//  * react-navigation.
//  */
// export const exitRoutes: string[] = ["welcome"]

// export const PrimaryNavigator = createStackNavigator(
//   {
//     register: { screen: SignupScreen },
//     login: { screen: LoginScreen },
//   },
//   {
//     initialRouteName: "login",
//     headerMode: "none",
//   },
// )

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
// export const exitRoutes: string[] = ["login"]

export const PrimaryNavigator = createStackNavigator(
  {
    addPersonalDetails: {
      screen: AddPersonalDetailsScreen,
    },
    professionalDetails: {
      screen: ProfessionalDetailsScreen,
    },
    familyDetails: { screen: FamilyDetailsScreen },
    addPictureScreen: { screen: AddPictureScreen },
  },
  {
    initialRouteName: "addPersonalDetails",
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["addPersonalDetails"]
