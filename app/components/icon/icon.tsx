import * as React from "react"
import { Image, ImageStyle, View } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}

export const SearchIcon = () => {
  return <FontAwesome name="search" size={24} color={"white"} />
}
