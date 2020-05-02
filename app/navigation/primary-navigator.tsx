import React from "react"
import { LandingScreen, ProfileScreen, ChatScreen } from "../screens"
import { ProfileNavigator } from "./profile-navigator"
import { createStackNavigator } from "react-navigation-stack"
import { TabView, SceneMap, NavigationState, SceneRendererProps } from "react-native-tab-view"
import { TabBar, SearchIcon, ChatIcon, Face } from "../components"

type Route = {
  key: string
  title: string
  icon: string
}

export type NavigationStateType = NavigationState<Route>

export const PrimaryNavigatorTabs = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "landing", title: "Explore", icon: SearchIcon },
    { key: "chat", title: "Connect", icon: ChatIcon },
    { key: "profile", title: "Profile", icon: Face },
  ])

  const renderScene = SceneMap({
    landing: LandingScreen,
    chat: ChatScreen,
    profile: ProfileScreen,
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
      swipeEnabled={false}
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
