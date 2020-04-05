import { observer } from "mobx-react-lite"
import moment from "moment"
import * as React from "react"
import { Controller, FormContext, useForm, useFormContext } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { Checkbox, Text } from "../components"
import { FormDatePicker } from "../components/FormComponents/DateInput"
import { FormPicker } from "../components/FormComponents/FormPicker"
import { FormInput, FormTextArea } from "../components/formInput"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"

export interface AddPersonalDetailsScreenProps extends NavigationScreenProp<{}> {}

const defaultData = {
  gender: "male",
  location: "Pune",
  age: 24,
}
export const AddPersonalDetailsScreen: React.FunctionComponent<AddPersonalDetailsScreenProps> = observer(
  (props) => {
    const { navigationStore } = useStores()
    const methods = useForm({
      defaultValues: defaultData,
    })
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.rootContainer}>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Hi Anurag,
          </Text>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Tell us more about yourself...
          </Text>
          <FormContext {...methods}>
            <PersonalDetailsForm />
          </FormContext>
        </ScrollView>
        <Button
          style={{ padding: spacing[2], marginTop: spacing[2] }}
          mode="contained"
          onPress={() => navigationStore.navigateTo("professionalDetails")}
        >
          Next
        </Button>
      </View>
    )
  },
)

const PersonalDetailsForm = () => {
  const methods = useFormContext()
  const isMale = methods.watch("gender") === "male"

  return (
    <View style={styles.personalFormContainer}>
      <View style={{ marginVertical: `${spacing[1]}%` }}>
        <Text>What is your Gender</Text>
        <View style={{ flexDirection: "row", marginTop: spacing[2] }}>
          <Controller
            name="gender"
            as={<Checkbox text="Male" style={{ flex: 1, marginEnd: `${spacing[1]}%` }} />}
            onChangeName="onPress"
          />
          <Checkbox
            text="Female"
            value={false}
            style={{ flex: 1, marginStart: `${spacing[1]}%` }}
          />
        </View>
      </View>

      <FormDatePicker
        label="Date of birth"
        placeholder="Pick your date of birth"
        maximumDate={new Date(moment(new Date()).subtract(18, "year").format())}
        minimumDate={new Date(moment(new Date()).subtract(150, "year").format())}
        name="dateOfBirth"
      />

      <FormInput
        name="age"
        label="Age"
        placeholder="What is your age?"
        required
        mask={"[00] Years"}
        defaultValue={"24"}
        disabled
        keyboardType="numeric"
      />
      <FormInput
        name="height"
        label="Height"
        placeholder="What is your height?"
        required
        mask="[0]' [09]"
        keyboardType="numeric"
      />
      <FormInput
        name="weight"
        label="Weight (in kg)"
        placeholder="What is your Weight?"
        required
        keyboardType="numeric"
        mask="[009]"
      />

      <FormPicker
        name="complexion"
        label="Complexion"
        list={["Light Skin", "Fair Skin", "Olive Skin", "Brown"]}
      />

      <FormPicker
        name="bloodGroup"
        label="Blood Group"
        list={["A +ve", "A -ve", "AB +ve", "AB -ve", "B +ve", "B -ve", "O +ve", "O -ve", "Unknown"]}
      />

      <FormPicker label="Physically Challenged" name="physicallyChallenged" list={["Yes", "No"]} />

      <FormInput
        name="hobbies"
        label="Hobbies"
        placeholder="Tell us what you enjoy doing"
        required
      />

      <FormPicker
        name="location"
        label="Location"
        list={["Kolhapur", "Sangli", "Satara", "Pune"]}
      />

      <FormTextArea
        name="address"
        label="Address"
        placeholder="What is your current address?"
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
