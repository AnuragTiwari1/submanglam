import * as React from "react"
import { View, TouchableOpacity, LayoutAnimation } from "react-native"
import { Text } from "../"
import { spacing } from "../../theme"
import { forwardRef } from "react"

export const ExpandAnimation = () =>
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.scaleY,
    ),
  )

const ExpandebleInputComponent = ({
  title,
  value,
  children,
  onStateChange,
  isDisabled = false
}: {
  title: string
  value: string
  children?: React.ReactChild
  onStateChange?: Function
  isDisabled?: boolean
}, ref) => {
  const [isExpanded, setExpanded] = React.useState(false)

  React.useImperativeHandle(ref, () => ({
    setExpanded,
  }
  ))

  React.useEffect(() => {
    typeof onStateChange === "function" && onStateChange()
  }, [isExpanded])

  return (
    <TouchableOpacity
      onPress={() => {
        ExpandAnimation()
        setExpanded(!isExpanded)
      }}
	  disabled={isDisabled}
    >
      <View
        pointerEvents="none"
        style={{ flexDirection: "row", padding: spacing[3], justifyContent: "space-between" }}
      >
        <Text>{title}</Text>
        <Text>{value}</Text>
      </View>
      {isExpanded && children ? <View>{children}</View> : null}
    </TouchableOpacity>
  )
}

export const ExpandebleInput = forwardRef(ExpandebleInputComponent)
