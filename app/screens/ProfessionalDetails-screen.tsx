import { observer } from "mobx-react-lite"
import * as React from "react"
import { Controller, FormContext, useForm, useFormContext } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { Checkbox, Text } from "../components"
import { FormPicker } from "../components/FormComponents/FormPicker"
import { FormInput } from "../components/formInput"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"

export interface ProfessionalDetailsScreenProps {
  navigation: NavigationScreenProp<{}>
}

const defaultData = {
  employed: "true",
  location: "Pune",
  age: 24,
}

export const ProfessionalDetailsScreen: React.FunctionComponent<ProfessionalDetailsScreenProps> = observer(
  (props) => {
    const { navigationStore } = useStores()
    const methods = useForm({
      defaultValues: defaultData,
    })
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.rootContainer}>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Lets build some ground about your professional life...
          </Text>
          <FormContext {...methods}>
            <PersonalDetailsForm />
          </FormContext>
        </ScrollView>
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

const PersonalDetailsForm = () => {
  const methods = useFormContext()

  return (
    <View style={styles.personalFormContainer}>
      <View style={{ marginVertical: `${spacing[1]}%` }}>
        <Text>Select whichever fit your situation?</Text>
        <View style={{ flexDirection: "row", marginTop: spacing[2] }}>
          <Controller
            name="employed"
            as={<Checkbox text="Working" style={{ flex: 1, marginEnd: `${spacing[1]}%` }} />}
            onChangeName="onPress"
          />
          <Checkbox
            text="Studying"
            value={false}
            style={{ flex: 1, marginStart: `${spacing[1]}%` }}
          />
        </View>
      </View>

      <FormInput
        name="profession"
        label="Profession"
        placeholder="Tell us about your profession"
        required
      />
      <FormInput
        name="companyName"
        label="Company Name"
        placeholder="What is name of company you work with?"
        required
      />

      <FormPicker
        name="salary"
        label="Salary"
        list={[
          "Upto 10,000",
          "Upto 20,000",
          "Upto 30,000",
          "Upto 40,000",
          "Upto 50,000",
          "Upto 60,000",
          "Upto 70,000",
          "Upto 80,000",
          "Upto 90,000",
          "Upto 1 Lakh",
        ]}
      />

      <FormInput
        label="College Name"
        name="collegeName"
        placeholder="What is name of college you attended(ing)?"
        required
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
