import { observer } from "mobx-react-lite"
import * as React from "react"
import { FormContext, useForm } from "react-hook-form"
import { View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { Text } from "../components"
import { FormImagePicker } from "../components/FormComponents/ImagePicker"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"

export interface AddPictureScreenProps {
  navigation: NavigationScreenProp<{}>
}

export const AddPictureScreen: React.FunctionComponent<AddPictureScreenProps> = observer(
  (props) => {
    const { navigationStore } = useStores()
    const methods = useForm({
      defaultValues: {
        profilePic: "",
      },
    })

    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: `${spacing[1]}%` }}>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Almost there,
          </Text>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Care to upload profile picture...
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FormContext {...methods}>
            <FormImagePicker name="profilePic" />
          </FormContext>
        </View>

        <Button
          style={{ padding: spacing[2], marginTop: spacing[2] }}
          mode="contained"
          onPress={() => navigationStore.navigateTo("familyDetails")}
        >
          Next
        </Button>
      </View>
    )
  },
)
