import * as React from "react"
import { View } from "react-native"
import { Text } from "../"
import { emptyPreferenceStyles as styles } from "./EmptyPreference.styles"

export interface EmptyPreferenceProps {
  message: string
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const EmptyPreference: React.FunctionComponent<EmptyPreferenceProps> = (props) => {
  // const { someStore } = useStores()

  return (
    <View style={styles.WRAPPER}>
      <Text style={{ flex: 1 }} preset={["text"]}>
        {props.message}
      </Text>
      <Text style={{ alignSelf: "flex-end", flex: 0 }} preset={["primary", "bold"]}>
        OK
      </Text>
    </View>
  )
}
