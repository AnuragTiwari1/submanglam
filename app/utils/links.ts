import { Linking, Alert } from "react-native"
import { API_URL } from "react-native-dotenv"

export const handleLinkPress = async (url: string) => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL(url)

  if (supported) {
    await Linking.openURL(url)
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`)
  }
}

export const getProfilePic = (filename: string) => {
  return __DEV__ ? `${API_URL}/images/${filename}` : `${API_URL}/images/${filename}`
}

export const trimEmail = (user_email) => {
  let avg, splitted, part1, part2
  splitted = user_email.split("@")
  part1 = splitted[0]
  avg = part1.length / 2
  part1 = part1.substring(0, part1.length - avg)
  part2 = splitted[1]
  return part1 + "***@" + part2
}
