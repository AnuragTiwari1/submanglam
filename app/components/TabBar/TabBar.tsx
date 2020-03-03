import { useObserver } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native"
import { Text, SearchIcon } from "../"
import { tabBarStyles as styles } from "./TabBar.styles"
import { TouchableOpacity } from "react-native-gesture-handler"
import { spacing } from "../../theme"
export interface TabBarProps {}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */

export const TabBarIconContainer = ({ children, onPress, tabName, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.ICON_CONTAINER,
        { backgroundColor: isActive ? "blue" : "rgba(0,0,0,0)" },
      ]}
      onPress={onPress}
    >
      {children}
      {isActive && (
        <Text style={{ marginHorizontal: spacing[2], marginTop: spacing[1] / 2 }}>{tabName}</Text>
      )}
    </TouchableOpacity>
  )
}

export const TabBar: React.FunctionComponent<TabBarProps> = props => {
  // const { someStore } = useStores()

  return (
    <View style={styles.WRAPPER}>
      <TabBarIconContainer tabName="Home" isActive>
        <SearchIcon />
      </TabBarIconContainer>
      <TabBarIconContainer tabName="Home">
        <SearchIcon />
      </TabBarIconContainer>
      <TabBarIconContainer tabName="Home">
        <SearchIcon />
      </TabBarIconContainer>
      <TabBarIconContainer tabName="Home">
        <SearchIcon />
      </TabBarIconContainer>
    </View>
  )
}
