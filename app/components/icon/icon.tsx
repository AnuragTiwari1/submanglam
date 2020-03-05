import * as React from "react"
import { Image, ImageStyle, View } from "react-native"
import { icons } from "./icons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: any) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}

export const SearchIcon = ({ props }: any) => {
  return <FontAwesome name="search" size={19} color="#3C40C6" {...props} />
}
