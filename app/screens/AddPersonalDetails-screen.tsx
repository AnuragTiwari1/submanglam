import { observer } from "mobx-react-lite"
import moment from "moment"
import * as React from "react"
import { FormContext, useForm } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { Text } from "../components"
import { FormDatePicker } from "../components/FormComponents/DateInput"
import { FormPicker } from "../components/FormComponents/FormPicker"
import { FormInput, FormTextArea } from "../components/formInput"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"
import { addPersonalDetailsForm } from "../validators/shapes"
import { withHandleFormReject } from "../hocs/withHandleFormReject"
import { IAddPersonalDetailShape } from "./types"
import { object } from "yup"

export interface AddPersonalDetailsScreenProps extends NavigationScreenProp<{}> {}

const defaultData: IAddPersonalDetailShape = {
  gender: "",
  location: "Pune",
  age: "",
  height: "",
  weight: "",
  complexion: "",
  bloodgroup: "",
  hobbies: "",
  address: "",
  physically: "",
  dob: "",
}

const getPersonalDetails = (object) =>
  (({
    gender,
    location,
    age,
    height,
    weight,
    complexion,
    bloodgroup,
    hobbies,
    address,
    physically,
    dob,
  }) => ({
    gender,
    location,
    age,
    height,
    weight,
    complexion,
    bloodgroup,
    hobbies,
    address,
    physically,
    dob,
  }))(object)

const getCleanFormData = (data) => {
  const { age, height, weight, ...rest } = data
  return {
    ...rest,
    age: Number(age.split(" ")[0]),
    weight: Number(weight),
    height: parseFloat(height.replace("' ", ".")),
  }
}

export const AddPersonalDetailsScreen: React.FunctionComponent<AddPersonalDetailsScreenProps> = observer(
  (props) => {
    const { navigationStore, authStore, appStateStore, userProfileForm } = useStores()
    const methods = useForm({
      defaultValues: { ...defaultData, ...getPersonalDetails(userProfileForm) },
      validationSchema: addPersonalDetailsForm,
    })

    React.useEffect(() => {
      methods.reset({ ...defaultData, ...getPersonalDetails(userProfileForm) })
    }, [userProfileForm])

    const onFormSubmit = (data) => {
      const cleanData = getCleanFormData(data)
      userProfileForm.updateProfile(cleanData)
      navigationStore.navigateTo("professionalDetails")
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.rootContainer}>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Hi {authStore.firstName},
          </Text>
          <Text style={{ fontSize: 28 }} preset={["header"]}>
            Tell us more about yourself...
          </Text>
          <FormContext {...methods}>
            <PersonalDetailsForm
              handleFormReject={(text) => appStateStore.toast.setToast({ text, styles: "angry" })}
            />
          </FormContext>
        </ScrollView>
        <Button
          style={{ padding: spacing[2], marginTop: spacing[2] }}
          mode="contained"
          onPress={methods.handleSubmit(onFormSubmit)}
        >
          Next
        </Button>
      </View>
    )
  },
)

const PersonalDetailsForm = withHandleFormReject(() => {
  return (
    <View style={styles.personalFormContainer}>
      <FormPicker name="gender" label="Select your gender" list={["male", "female"]} />

      <FormDatePicker
        label="Date of birth"
        placeholder="Pick your date of birth"
        maximumDate={new Date(moment(new Date()).subtract(18, "year").format())}
        minimumDate={new Date(moment(new Date()).subtract(150, "year").format())}
        name="dob"
      />

      <FormInput
        name="age"
        label="Age"
        placeholder="What is your age?"
        required
        mask={"[00] Years"}
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
        name="bloodgroup"
        label="Blood Group"
        list={["A +ve", "A -ve", "AB +ve", "AB -ve", "B +ve", "B -ve", "O +ve", "O -ve", "Unknown"]}
      />

      <FormPicker label="Physically Challenged" name="physically" list={["Yes", "No"]} />

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
})

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "white",
    padding: `${spacing[1]}%`,
  },
  personalFormContainer: {
    paddingVertical: spacing[3],
  },
})
