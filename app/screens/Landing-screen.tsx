import * as React from "react"
import { Image, View, RefreshControl } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import AntIcons from "react-native-vector-icons/AntDesign"
import { NavigationScreenProp } from "react-navigation"
import { Text } from "../components"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"
import { useFetch } from "use-fetch-lib"
import { getProfilePic } from "../utils/links"
import { IUserStory } from "./types"
export interface LandingScreenProps {
  navigation: NavigationScreenProp<{}>
}

interface IntroProps {
  id: string
  name: string
  age: number
  profilepic: string
  isSaved?: boolean
  profession?: string
  promoted?: boolean
}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = (props) => {
  const { navigationStore, peopleStore } = useStores()

  const [{ data, status }, service] = useFetch<{ profilelist: IntroProps[] }>({
    url: "/get/profilelist",
    method: "get",
    shouldDispatch: true,
  })

  const [{ data: people, status: peopleLoadingStatus }, fetchPeople] = useFetch<{
    peoplelist: IUserStory[]
  }>({
    url: "/get/people",
    method: "post",
  })

  const [refreshing, setRefreshing] = React.useState(false)

  React.useEffect(() => {
    if (!status.isPending) {
      if (refreshing) setRefreshing(false)
    }
  }, [status])

  React.useEffect(() => {
    if (peopleLoadingStatus.isFulfilled) {
      peopleStore.setPeoples(people.peoplelist)
      navigationStore.navigateTo("profile")
    }
  }, [peopleLoadingStatus])

  return (
    <View style={{ flex: 1, padding: 3, backgroundColor: "white" }}>
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
        data={data?.profilelist || []}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <IntroCard
              {...item}
              onPress={() => {
                fetchPeople({ id: item.id })
              }}
            />
          )
        }}
        ListEmptyComponent={
          <Text preset={["header", "center"]}>
            {status.isPending ? "Fetching" : "No profile found"}
          </Text>
        }
        keyExtractor={(item, index) => `${index}-${item.name}`}
        ListFooterComponent={
          data?.profilelist?.length ? (
            <Text preset={["center", "muted"]}>That's all folks.</Text>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              service()
            }}
          />
        }
      />
    </View>
  )
}

const HEART_CONTAINER_DIMENSION = 40

const IntroCard = (props: IntroProps & { onPress: (e: any) => void }) => {
  return (
    <View style={{ flex: 1, margin: 5 }}>
      <TouchableOpacity style={{ width: "100%" }} onPress={props.onPress}>
        <Image
          source={{ uri: getProfilePic(props.profilepic) }}
          style={{ width: "100%", height: 300, borderRadius: 12 }}
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
              <Text>{props.name.split(" ")[0]}</Text>, &nbsp;<Text>{props.age}</Text>
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
        </View>
      </TouchableOpacity>
    </View>
  )
}
