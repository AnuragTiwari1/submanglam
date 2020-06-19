import React, { useEffect } from "react"
import {
  LandingScreen,
  ProfileScreen,
  ChatScreen,
  AddMediaScreen,
  AddPreferencesScreen,
  AccountScreen,
} from "../screens"
import { ProfileNavigator } from "./profile-navigator"
import { createStackNavigator } from "react-navigation-stack"
import { TabView, SceneMap, NavigationState } from "react-native-tab-view"
import { TabBar, SearchIcon, ChatIcon, Face } from "../components"
import { View, StatusBar } from "react-native"
import { CreateProfileNavigator } from "./createProfile-navigator"
import EventSource from "react-native-event-source"
import { API_URL } from "react-native-dotenv"
import { observer } from "mobx-react-lite"
import { useStores } from "../models/root-store"

type Route = {
  key: string
  title: string
  icon: string
}

export type NavigationStateType = NavigationState<Route>

export const PrimaryNavigatorTabs = observer(() => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "landing", title: "Explore", icon: SearchIcon },
    { key: "chat", title: "Connect", icon: ChatIcon },
    { key: "profile", title: "Profile", icon: Face },
  ])

  const { authStore, actionStore } = useStores()

  const renderScene = SceneMap({
    landing: LandingScreen,
    chat: ChatScreen,
    profile: ProfileScreen,
  })

  const handleEvent = (data) => {
    actionStore.addAppActions(JSON.parse(data.data))
  }

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/events?email=${authStore.email}`)

    eventSource.addEventListener("message", (message) => {
      handleEvent(message)
    })

    return () => {
      eventSource.removeAllListeners()
      eventSource.close()
    }
  }, [])

  return (
    <View style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
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
    </View>
  )
})

export const PrimaryNavigator = createStackNavigator(
  {
    landingScreen: { screen: PrimaryNavigatorTabs },
    profile: { screen: ProfileNavigator },
    updateProfile: { screen: CreateProfileNavigator },
    addMediaScreen: { screen: AddMediaScreen },
    SetPreferences: { screen: AddPreferencesScreen },
    Accounts: { screen: AccountScreen },
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
