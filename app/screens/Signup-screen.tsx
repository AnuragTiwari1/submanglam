import { observer } from "mobx-react-lite"
import * as React from "react"
import { FormContext, useForm } from "react-hook-form"
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { NavigationScreenProp } from "react-navigation"
import { DismissKeyboardView, Text } from "../components"
import { FormInput } from "../components/formInput"
import { spacing } from "../theme"
import { useStores } from "../models/root-store"

export interface SignupScreenProps {
  navigation: NavigationScreenProp
}

const { height } = Dimensions.get("window")

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

export const SignupScreen: React.FunctionComponent<SignupScreenProps> = observer(props => {
  return (
    <ImageBackground
      source={require("../../assets/images/login_image.jpg")}
      style={{ width: "100%", height: "100%" }}
      blurRadius={2.2}
    >
      <DismissKeyboardView style={styles.ROOT}>
        <Text preset="header">Let's get you on board ...</Text>
        <SignupForm onSignIn={() => props.navigation.navigate("addPersonalDetails")} />
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
})

const SignupForm = ({ onSignIn }) => {
  const { navigationStore } = useStores()
  const [value, setValue] = React.useState("")
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  return (
    <View style={styles.INPUT_CONTAINER}>
      <FormContext {...methods}>
        <FormInput name="name" label="Full Name" value={value} onChangeText={setValue} />
        <FormInput name="email" label="Email" value={value} onChangeText={setValue} />
        <FormInput name="password" label="Password" value={value} onChangeText={setValue} />
      </FormContext>
      <Button
        style={{ padding: spacing[2], marginTop: spacing[2] }}
        mode="contained"
        onPress={() => onSignIn()}
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
  )
}
