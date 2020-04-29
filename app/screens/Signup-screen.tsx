import * as React from "react"
import { FormContext, useForm } from "react-hook-form"
import { ImageBackground, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { DismissKeyboardView, Text } from "../components"
import { FormInput } from "../components/formInput"
import { spacing } from "../theme"
import { useStores } from "../models/root-store"
import { getYupValidationResolver } from "../validators/formUtils"
import { registerForm } from "../validators/shapes"
import { withHandleFormReject } from "../hocs/withHandleFormReject"
export interface SignupScreenProps {
  navigation: NavigationScreenProp<SignupScreenProps>
}

export interface SignFormShape {
  name: string
  email: string
  password: string
}

const styles = StyleSheet.create({
  ROOT: {
    flex: 1,
    padding: `${spacing[1]}%`,
  },

  INPUT_CONTAINER: {
    flex: 1,
    marginHorizontal: `${spacing[2]}%`,
    justifyContent: "center",
  },
})

export const SignupScreen: React.FunctionComponent<SignupScreenProps> = () => {
  const { appStateStore, navigationStore } = useStores()

  const methods = useForm<SignFormShape>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validationResolver: getYupValidationResolver(registerForm),
  })

  const handleFormSubmit = (data) => {
    console.log("boy you got it >>>>>>", data)
  }

  return (
    <ImageBackground
      source={require("../../assets/images/login_image.jpg")}
      style={{ width: "100%", height: "100%" }}
      blurRadius={2.2}
    >
      <DismissKeyboardView style={styles.ROOT}>
        <Text preset="header">Let's get you on board ...</Text>
        <View style={styles.INPUT_CONTAINER}>
          <FormContext {...methods}>
            <SignupForm
              handleFormReject={(err) =>
                appStateStore.toast.setToast({ text: err, styles: "angry" })
              }
            />
          </FormContext>
          <Button
            style={{ padding: spacing[2], marginTop: spacing[2] }}
            mode="contained"
            onPress={methods.handleSubmit(handleFormSubmit)}
          >
            Sign Up
          </Button>
          <Text
            style={{ marginTop: spacing[3] }}
            preset={["center", "white"]}
            onPress={() => navigationStore.navigateTo("login")}
          >
            Already have an account?
          </Text>
        </View>

        <Text preset={["center", "dullWhite", "small"]}>
          By continuing you agree to our{" "}
          <Text preset={["link", "small"]} url="https://github.com/site/terms">
            terms and conditions
          </Text>{" "}
          and{" "}
          <Text
            preset={["link", "small"]}
            url="https://help.github.com/en/github/site-policy/github-terms-of-service"
          >
            privacy policy
          </Text>
        </Text>
      </DismissKeyboardView>
    </ImageBackground>
  )
}

const SignupForm: React.FC<IFormCommon<SignFormShape>> = withHandleFormReject(() => {
  return (
    <View>
      <FormInput name="name" label="Full Name" />
      <FormInput name="email" label="Email" />
      <FormInput name="password" label="Password" />
    </View>
  )
})
