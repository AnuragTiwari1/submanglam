import { createStackNavigator } from "react-navigation-stack"
import { WelcomeScreen, DemoScreen } from "../screens"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"

export const ProfileNavigatorNavigator = createSharedElementStackNavigator(
  {
    welcome: { screen: WelcomeScreen },
    demo: { screen: DemoScreen },
  },
  {
    initialRouteName: "welcome",
    headerMode: "none",
  },
)

export const exitRoutes: string[] = ["welcome"]
