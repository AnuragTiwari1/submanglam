import { createBottomTabNavigator } from "react-navigation-tabs"
import React from "react"
import { LandingScreen } from "../screens"
import { ProfileNavigator } from "./profile-navigator"
import { createStackNavigator } from "react-navigation-stack"
import { TabView, SceneMap, NavigationState, SceneRendererProps } from "react-native-tab-view"
import { TabBar } from "../components"

export const PrimaryNavigatorTabs = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "landing", title: "Explore" },

    { key: "chat", title: "Chat" },
    { key: "profile", title: "Profile" },
  ])

  const renderScene = SceneMap({
    landing: LandingScreen,
    chat: LandingScreen,
    profile: LandingScreen,
  })

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={TabBar}
      tabBarPosition="bottom"
      onIndexChange={setIndex}
    />
  )
}

export const PrimaryNavigator = createStackNavigator(
  {
    landingScreen: { screen: PrimaryNavigatorTabs },
    profile: { screen: ProfileNavigator },
  },
  {
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "landingScreen",
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
export const exitRoutes: string[] = ["landingScreen"]

//this is render a tab view with custom tab bar
