import * as React from "react"
import { Image, ImageStyle, View } from "react-native"
import { icons } from "./icons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons"
import AntIcons from "react-native-vector-icons/AntDesign"
import { color } from "react-native-reanimated"

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

interface IconProps {
  size?: number
  color?: string
}

export const IconSize = {
  small: 18,
}

export const SearchIcon = (props: IconProps) => {
  return <FontAwesome name="search" size={19} color="#3C40C6" {...props} />
}

export const LocationIcon = (props: IconProps) => {
  return <Entypo name="location-pin" color={"#000"} size={25} {...props} />
}

export const OfficeBag = (props: IconProps) => {
  return <Entypo name="briefcase" color={"#000"} size={25} {...props} />
}

export const EducationCap = (props) => {
  return <Entypo name="graduation-cap" color={"#000"} size={25} {...props} />
}

export const BalanceScale = (props) => {
  return <FontAwesome name="balance-scale" color={"#000"} size={25} {...props} />
}

export const HomeModern = (props) => {
  return <MaterialCommunity name="home-modern" size={25} {...props} />
}

export const Hobbies = (props) => {
  return <Entypo name="hour-glass" size={25} {...props} />
}

export const Face = (props) => {
  return <MaterialCommunity name="face" size={25} color="#3C40C6" {...props} />
}

export const Dollar = (props) => {
  return <FontAwesome name="dollar" size={25} {...props} />
}

export const HeartIcon = (props) => {
  return <AntIcons name="heart" size={35} color={"red"} />
}

export const Report = (props) => {
  return <AntIcons name="notification" size={25} color={"red"} {...props} />
}

export const SendIcon = (props) => {
  return <FontAwesome name="send" size={25} color={"#0088cc"} {...props} />
}

export const CloseIcon = (props) => {
  return <MaterialCommunity name="close-circle" size={25} color={"red"} />
}

export const ChatIcon = (props) => {
  return <FontAwesome name="wechat" size={25} color="#3C40C6" {...props} />
}
