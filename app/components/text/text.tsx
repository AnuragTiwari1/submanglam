import React, { ReactNode } from "react"
import { StyleSheet, TextProps, Text as AppText } from "react-native"
import { presets as styles, TextPresets as IStyles } from "./text.presets"
interface IProps extends TextProps {
  children: string | ReactNode
  preset?: IStyles[] | IStyles
}

const getType = (type: IStyles) => (styles[type] ? styles[type] : {})
export const Text = (props: IProps) => {
  const { children, style, preset = [] } = props

  const textStyles = [
    StyleSheet.flatten([
      styles.text,
      typeof preset === "string" ? getType(preset) : preset.map(e => getType(e)),
      style,
    ]),
  ]
  return (
    <AppText {...props} style={textStyles}>
      {children}
    </AppText>
  )
}
