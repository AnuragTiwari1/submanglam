import * as React from "react"
import { FormContext, useForm } from "react-hook-form"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { Text, DismissKeyboardView } from "../components"
import { FormInput } from "../components/formInput"
import { useStores } from "../models/root-store"
import { spacing } from "../theme"
import { withHandleFormReject } from "../hocs/withHandleFormReject"
import * as Yup from "yup"
import { emailValidator } from "../validators/fields"
import { useFetch } from "use-fetch-lib"

export interface LoginScreenProps extends NavigationScreenProp<{}> {}

const styles = StyleSheet.create({
  ROOT: {
    justifyContent: "space-between",
    flex: 1,
  },
  LOGO_CONTAINER: {
    alignItems: "center",
    marginVertical: `${spacing[2]}%`,
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: `${spacing[3]}%`,
  },
  INPUT_CONTAINER: {
    flex: 1,
    marginHorizontal: `${spacing[2]}%`,
  },
})

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = () => {
  const { navigationStore, appStateStore, authStore } = useStores()
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: emailValidator,
      password: Yup.string().required(),
    }),
  })

  const [{ data, status }, service] = useFetch<LoginFormResponse>({
    url: "/login",
    method: "post",
  })

  const handleFormSubmit = (data) => {
    service(data)
  }

  React.useEffect(() => {
    if (status.isFulfilled) {
      const { isProfileComplete } = data
      authStore.setUser(data)
      isProfileComplete
        ? navigationStore.navigateTo("primaryStack")
        : navigationStore.navigateTo("addPersonalDetails")
    }
    if (status.isRejected) {
      appStateStore.toast.setToast({ text: status.err, styles: "angry" })
    }
  }, [status])

  return (
    <ImageBackground
      source={require("../../assets/images/login_image.jpg")}
      style={{ width: "100%", height: "100%" }}
      blurRadius={2.2}
    >
      <DismissKeyboardView style={{ flex: 1 }}>
        <View style={styles.ROOT}>
          <View style={styles.LOGO_CONTAINER}>
            <Text
              style={{
                fontSize: 55,
              }}
              preset={["header", "white"]}
            >
              Welcome
            </Text>
            <Text preset={["large", "white", "center"]}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit "
            </Text>
          </View>
          <View style={styles.INPUT_CONTAINER}>
            <FormContext {...methods}>
              <FormComponent
                handleFormReject={(text) => appStateStore.toast.setToast({ text, styles: "angry" })}
              />
            </FormContext>

            <Button
              style={{ padding: spacing[2], marginTop: spacing[2] }}
              mode="contained"
              disabled={status.isPending}
              loading={status.isPending}
              onPress={methods.handleSubmit(handleFormSubmit)}
            >
              Sign In
            </Button>
            <Text style={{ marginTop: spacing[3] }} preset={["center", "white"]}>
              <Text>Need help?</Text>
              <Text>&nbsp; &nbsp;|&nbsp; &nbsp;</Text>
              <Text onPress={() => navigationStore.navigateTo("register")}>Register</Text>
            </Text>
          </View>
          <Text style={{ marginBottom: spacing[2] }} preset={["center", "dullWhite", "small"]}>
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
        </View>
      </DismissKeyboardView>
    </ImageBackground>
  )
}

const FormComponent = withHandleFormReject(() => {
  return (
    <View>
      <FormInput name="email" label="Email" />
      <FormInput name="password" label="Password" />
    </View>
  )
})
