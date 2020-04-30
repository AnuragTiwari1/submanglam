import * as React from "react"
import { FormContext, useForm } from "react-hook-form"
import { ImageBackground, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { DismissKeyboardView, Text } from "../components"
import { FormInput } from "../components/formInput"
import { spacing } from "../theme"
import { useStores } from "../models/root-store"
import { registerForm } from "../validators/shapes"
import { withHandleFormReject } from "../hocs/withHandleFormReject"
import { useFetch } from "use-fetch-lib"

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

const getCleanFormData = (formData: SignFormShape): SignupFormRequest => {
  const { name, ...rest } = formData
  return {
    fullName: name,
    ...rest,
  }
}

const defaultSignupFormValues = {
  name: "Anu",
  email: "anu@rag.com",
  password: "1",
}

export const SignupScreen: React.FunctionComponent<SignupScreenProps> = () => {
  const { appStateStore, navigationStore, authStore } = useStores()

  const methods = useForm<SignFormShape>({
    defaultValues: defaultSignupFormValues,
    validationSchema: registerForm,
  })

  const [{ data, status }, service] = useFetch<SignupFormResponse>({
    url: "/register",
    method: "post",
  })

  React.useEffect(() => {
    const { watch } = methods

    if (status.isFulfilled) {
      authStore.setUser({ email: watch("email"), token: data.success, firstName: watch("name") })
      navigationStore.navigateTo("addPersonalDetails")
    }
    if (status.isRejected) {
      appStateStore.toast.setToast({ text: status.err, styles: "angry" })
    }
  }, [status])

  const handleFormSubmit = (formData: SignFormShape) => {
    service(getCleanFormData(formData))
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
            loading={status.isPending}
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
