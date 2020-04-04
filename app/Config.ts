import { Platform } from "react-native"

export default {
  isAndroid: Platform.OS === "android",
  logGeneral: true,
  logNetworkErrors: false,
  isTablet: false,
  defaultImage: "someimageurl",
  errorMessage: "Oops! There seem to be some error right now. Please try after some time.",
  dateFormatString: "DD/MM/YYYY",
}
