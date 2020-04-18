import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, View } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import AntIcons from "react-native-vector-icons/AntDesign"
import { NavigationScreenProp } from "react-navigation"
import { Text } from "../components"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"
export interface LandingScreenProps {
  navigation: NavigationScreenProp<{}>
}

interface IntroProps {
  name: string
  age: number
  imgUrl: string
  isSaved?: boolean
  profession?: string
  promoted?: boolean
}
const data: IntroProps[] = [
  {
    name: "Kaira",
    age: 20,
    imgUrl: "https://i.pinimg.com/originals/fb/53/fe/fb53fe5eb1f6b7c81bffc653c5149e88.jpg",
  },
  {
    name: "Anshika",
    age: 27,
    imgUrl: "https://i.pinimg.com/236x/b4/53/55/b453553626e6ec57ca7835ad9b71a24d.jpg",
  },
  {
    name: "Kaira",
    age: 20,
    imgUrl: "https://i.pinimg.com/originals/fb/53/fe/fb53fe5eb1f6b7c81bffc653c5149e88.jpg",
  },
  {
    name: "Anshika",
    age: 27,
    imgUrl: "https://i.pinimg.com/236x/b4/53/55/b453553626e6ec57ca7835ad9b71a24d.jpg",
  },
  {
    name: "Kaira",
    age: 20,
    imgUrl: "https://i.pinimg.com/originals/fb/53/fe/fb53fe5eb1f6b7c81bffc653c5149e88.jpg",
    profession: "Developer",
    promoted: true,
  },
  {
    name: "Anshika",
    age: 27,
    imgUrl: "https://i.pinimg.com/236x/b4/53/55/b453553626e6ec57ca7835ad9b71a24d.jpg",
  },
]

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = observer((props) => {
  const { navigationStore } = useStores()
  return (
    <View style={{ flex: 1, padding: 3,backgroundColor:'white' }}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              width: "100%",
              paddingHorizontal: `${spacing[3]}%`,
              paddingBottom: `${spacing[2]}%`,
            }}
          >
            <Text preset={["header", "center"]}>Explore</Text>
            <Text preset={["center"]}>
              look through all the profile in your area and connect with them to see if it works
              out.
            </Text>
          </View>
        }
        data={data}
        numColumns={2}
        renderItem={({ item }) => {
          return <IntroCard {...item} onPress={() => navigationStore.navigateTo("profile")} />
        }}
        keyExtractor={(item, index) => `${index}-${item.name}`}
        ListFooterComponent={<Text preset={["center", "muted"]}>That's all folks.</Text>}
      />
    </View>
  )
})

const HEART_CONTAINER_DIMENSION = 40

const IntroCard = (props: IntroProps & { onPress: Function }) => {
  return (
    <View style={{ flex: 1, margin: 5 }}>
      <TouchableOpacity style={{ width: "100%" }} onPress={props.onPress}>
        <Image
          source={{ uri: props.imgUrl }}
          style={{ width: "100%", height: 200, borderRadius: 12 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            paddingBottom: spacing[1],
            width: "98%",
            paddingLeft: spacing[2],
            backgroundColor: "rgba(0,0,0,0.3)",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text preset={["white", "small"]}>
              <Text>{props.name}</Text>, &nbsp;<Text>{props.age}</Text>
            </Text>
            <Text
              style={{
                color: "#FFD700",
                textTransform: "capitalize",
              }}
              preset={["bold", "small"]}
            >
              {props.profession || "Student"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: HEART_CONTAINER_DIMENSION,
              height: HEART_CONTAINER_DIMENSION,
              borderRadius: HEART_CONTAINER_DIMENSION / 2,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntIcons name="heart" size={18} color={"red"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  )
}
