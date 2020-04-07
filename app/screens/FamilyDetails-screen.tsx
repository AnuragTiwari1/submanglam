import { observer } from "mobx-react-lite"
import * as React from "react"
import { Controller, FormContext, useForm, useFormContext } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { Checkbox, Text } from "../components"
import { FormPicker } from "../components/FormComponents/FormPicker"
import { FormInput, FormTextArea } from "../components/formInput"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"

export interface FamilyDetailsScreenProps {
  navigation: NavigationScreenProp<{}>
}

const defaultData = {
  employed: "true",
  location: "Pune",
  age: 24,
}

export const FamilyDetailsScreen: React.FunctionComponent<FamilyDetailsScreenProps> = observer(
  (props) => {
    const { navigationStore } = useStores()
    const methods = useForm({
      defaultValues: defaultData,
    })
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.rootContainer}>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Tell us to your family and idea of marriage
          </Text>
          <FormContext {...methods}>
            <PersonalDetailsForm />
          </FormContext>
        </ScrollView>
        <Button
          style={{ padding: spacing[2], marginTop: spacing[2] }}
          mode="contained"
          onPress={() => navigationStore.navigateTo("addPictureScreen")}
        >
          Next
        </Button>
      </View>
    )
  },
)

const PersonalDetailsForm = () => {
  const methods = useFormContext()

  return (
    <View style={styles.personalFormContainer}>
      <FormInput
        label="Father Profession"
        name="fatherProfession"
        placeholder="Tell us about your father profession"
        required
      />
      <FormInput
        label="Mother Profession"
        name="motherProfession"
        placeholder="Tell us about your mother profession"
        required
      />

      <FormTextArea
        name="expectation"
        label="Expectations"
        placeholder="What is your take on idea of marriage?"
        required
      />

      <FormInput
        name="phone"
        label="Your Mobile Number"
        placeholder="Enter your contact number"
        mask="(+91) [0000] [000] [000]"
      />

      <FormInput
        name="parentPhone"
        label="Your Parent's Contact Number"
        placeholder="Enter your parents contact number"
        mask="(+91) [0000] [000] [000]"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "white",
    padding: `${spacing[1]}%`,
  },
  personalFormContainer: {
    paddingVertical: spacing[3],
  },
})
