import { createBottomTabNavigator } from "react-navigation-tabs"
import {
  LandingScreen,
  PeopleScreen,
  ProfileScreen,
} from "../screens"

export const PrimaryTabNavigator = createBottomTabNavigator({
  landing: { screen: LandingScreen },
  chat: { screen: PeopleScreen },
  myprofile: { screen: ProfileScreen },
})
