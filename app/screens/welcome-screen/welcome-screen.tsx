import * as React from "react"
import { View, Image, ImageBackground, StyleSheet, Dimensions } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Text, TabBar } from "../../components"
import { spacing } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import AntIcons from "react-native-vector-icons/AntDesign"

const { width } = Dimensions.get("window")
export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

const imgUrl = "https://i.pinimg.com/564x/05/8b/0e/058b0ea70bee2dc34ad8a2ef9c959f83.jpg"
const imageWidth = width * 0.8

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: `${spacing[1]}%`,
  },
  details: {
    flex: 1,
    alignItems: "center",
  },
  hero: {
    borderWidth: spacing[2],
    borderColor: "#FFF",
  },
  heroImageContainer: {
    alignItems: "center",
    elevation: 4,
    flex: 2,
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    padding: spacing[4],
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing[3],
  },
  iconRowContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
})

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  return (
    <ImageBackground
      source={{ uri: imgUrl }}
      style={{ width: "100%", height: "100%" }}
      blurRadius={1.2}
    >
      <View style={styles.container}>
        <View style={styles.heroImageContainer}>
          <Image
            style={styles.hero}
            source={{ uri: imgUrl }}
            width={imageWidth}
            height={imageWidth}
            resizeMode="cover"
            borderRadius={imageWidth / 2}
          />
          <View style={styles.iconRowContainer}>
            <TouchableOpacity style={styles.buttonContainer}>
              <AntIcons name="heart" size={35} color={"red"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <AntIcons name="pushpin" size={35} color={"red"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.details}>
          <Text preset={["header"]}>Errza Scarlet</Text>
          <Text>23, 5'6</Text>
          <Text>Hindu,Punjabi</Text>
          <Text>Software Developer</Text>

          <View style={{ marginTop: `${spacing[2]}%`, alignItems: "center" }}>
            <AntIcons name="up" size={20} color={"white"} />
            <Text>Swipe up to know more</Text>
          </View>
        </View>
        <TabBar />
      </View>
    </ImageBackground>
  )
}
