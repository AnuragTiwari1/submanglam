import { ViewStyle, Dimensions } from "react-native"
import { spacing } from "../../theme"
const { width } = Dimensions.get("screen")

export const tabBarStyles = {
  WRAPPER: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(60,64,198,0.7)",
    alignItems: "center",
    alignSelf: "center",
    minWidth: width * 0.7,
    borderRadius: width * 0.3,
  } as ViewStyle,
  ICON_CONTAINER: {
    padding: spacing[3],
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: width * 0.3,
    flexDirection: "row",
  },
}
