import { color, getFontStyleObject } from "../../theme"

export const presets = {
  /**
   * The default text styles.
   */
  text: {
    fontSize: 18,
    ...getFontStyleObject(),
  },

  bold: {
    ...getFontStyleObject({ weight: "Bold" }),
  },
  primary: {
    color: color.primary,
  },
  white: {
    color: color.palette.white,
  },
  dullWhite: {
    color: color.palette.offWhite,
  },
  small: {
    fontSize: 15,
  },
  xLarge: {
    fontSize: 30,
  },
  large: {
    fontSize: 22,
  },
  center: {
    textAlign: "center",
  },
  right: { textAlign: "right", alignSelf: "stretch" },
  muted: {
    color: color.palette.lightGrey,
  },
  paragraph: {
    color: color.palette.darkGrey,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
  header: {
    fontSize: 35,
    ...getFontStyleObject({ family: "Anson", weight: "Regular" }),
  },
  fontAnson: {
    ...getFontStyleObject({ family: "Anson", weight: "Regular" }),
  },
  underline: {
    textDecorationLine: "underline",
  },
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
