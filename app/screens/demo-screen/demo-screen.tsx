import * as React from "react"
import { View, ViewStyle } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Text } from "../../components"

const FULL: ViewStyle = { flex: 1 }

export interface DemoScreenProps extends NavigationInjectedProps<{}> {}

export const DemoScreen: React.FunctionComponent<DemoScreenProps> = props => {
  return (
    <View style={FULL}>
      <Text preset='fieldLabel'>Ladki details will be here</Text>
    </View>
  )
}
