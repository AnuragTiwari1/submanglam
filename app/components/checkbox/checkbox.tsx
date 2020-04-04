import * as React from "react"
import {
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  View,
  StyleSheet,
  LayoutAnimation,
} from "react-native"
import { Text } from "../"
import { color, spacing } from "../../theme"
import { CheckboxProps } from "./checkbox.props"
import { mergeAll, flatten } from "ramda"
import AntIcons from "react-native-vector-icons/AntDesign"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing[2],
  alignSelf: "flex-start",
  alignItems: "center",
  justifyContent: "center",
  //inactiveStyles
  borderWidth: 1,
  borderColor: color.line,
  borderRadius: 2,
}

const DIMENSIONS = { width: 16, height: 16 }

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: color.primaryDarker,
  borderRadius: 1,
}

const FILL: ViewStyle = {
  width: DIMENSIONS.width - 4,
  height: DIMENSIONS.height - 4,
  backgroundColor: color.primary,
}

const LABEL: TextStyle = { paddingLeft: spacing[2] }

export function Checkbox(props: CheckboxProps) {
  const rootStyle = mergeAll(flatten([ROOT, props.style]))
  const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]))
  const fillStyle = mergeAll(flatten([FILL, props.fillStyle]))

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

    return props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={[rootStyle, props.value ? styles.activeStyles : {}]}
    >
      <Text style={[LABEL, props.value ? styles.activeLabel : {}]}>{props.text}</Text>
      {props.value ? (
        <AntIcons name="check" size={25} style={{ marginStart: "auto" }} color={color.primary} />
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  activeStyles: {
    paddingHorizontal: spacing[1],
    borderColor: color.primary,
    elevation: 2,
  },
  activeLabel: {
    color: color.primary,
  },
})
