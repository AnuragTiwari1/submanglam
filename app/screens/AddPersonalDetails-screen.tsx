import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, StyleSheet, View } from "react-native"
import { Screen, Text, Checkbox } from "../components"
// import { useStores } from "../models/root-store"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { useForm, Controller, FormContext, useFormContext } from "react-hook-form"
import { FormDatePicker } from "../components/FormComponents/DateInput"
import moment from "moment"
import { FormInput, FormTextArea } from "../components/formInput"
import { Button } from "react-native-paper"

export interface AddPersonalDetailsScreenProps extends NavigationScreenProps<{}> {}

const defaultData = {
  gender: "male",
  location: "Pune",
  age: 24,
}
export const AddPersonalDetailsScreen: React.FunctionComponent<AddPersonalDetailsScreenProps> = observer(
  (props) => {
    // const { someStore } = useStores()
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
          // onPress={() => onSignIn()}
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

      {/* <Controller
          name="gender"
          as={
            <Checkbox
              text="Female"
              value={false}
              style={{ flex: 1, marginStart: `${spacing[1]}%` }}
            />
          }
          onChangeName="onPress"
        /> */}

      <FormDatePicker
        label="Date of birth"
        placeholder="Pick your date of birth"
        maximumDate={new Date(moment(new Date()).subtract(18, "year").format())}
        minimumDate={new Date(moment(new Date()).subtract(150, "year").format())}
        name="dateOfBirth"
      />
      {/* <FormInput name="dateOfBirth" label="Date of Birth" placeholder="Pick your Date of Birth" /> */}
      <FormInput
        name="age"
        label="Age"
        placeholder="What is your age?"
        required
        defaultValue={"24"}
        disabled
      />
      <FormInput name="height" label="Height" placeholder="What is your height?" required />
      <FormInput name="weight" label="Weight" placeholder="What is your Weight?" required />
      <FormInput
        name="complexation"
        label="Complexation"
        placeholder="What is your Complexatio?"
        required
      />

      <FormInput name="location" label="Location" placeholder="Where are you located?" required />
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
