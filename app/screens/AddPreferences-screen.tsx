import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View, StyleSheet } from "react-native"
import { Screen, Text } from "../components"
import { color, spacing } from "../theme"
import { NavigationScreenProp } from "react-navigation"
import { Checkbox } from "react-native-paper"
import { useStores } from "../models/root-store"
import { LOCATIONS, MARITAL_STATUS, COMPLEXION } from "../constants"
import { FlatList } from "react-native-gesture-handler"
import { useFetch } from "use-fetch-lib"

export interface AddPreferencesScreenProps {
  navigation: NavigationScreenProp<{}>
}

const ROOT: ViewStyle = {
  paddingTop: StatusBar.currentHeight + spacing[3],
  paddingHorizontal: spacing[3],
}

const SETTINGS_LIST = ["city", "status", "complexion"]

export const AddPreferencesScreen: React.FunctionComponent<AddPreferencesScreenProps> = observer(
  (props) => {
    const [currentStep, setStep] = React.useState("city")
    const { preferenceStore, navigationStore, appStateStore } = useStores()

    const [{ data, status }, sevicesCaller] = useFetch({
      url: "/set/preference",
      method: "post",
    })

    React.useEffect(() => {
      if (status.isFulfilled) {
        appStateStore.toast.setToast({
          text: "You are all set. Preferences updated successfully",
          styles: "success",
        })

        navigationStore.navigateTo("landingScreen")
      }
    }, [status])

    return (
      <Screen style={ROOT} preset="fixed">
        <Text preset={["header", "center"]}>Set your Preference</Text>
        <Text preset={["center"]} style={{ marginTop: spacing[2] }}>
          setting up your preference help us find out your perfect partner faster
        </Text>
        <View style={{ flex: 1, marginHorizontal: spacing[3], marginTop: spacing[8] }}>
          {
            {
              city: (
                <SelectGroup
                  value={preferenceStore.city}
                  onChange={(city) => {
                    preferenceStore.set("city", city)
                  }}
                  options={LOCATIONS}
                />
              ),
              status: (
                <SelectGroup
                  value={preferenceStore.maritalStatus}
                  onChange={(status) => {
                    preferenceStore.set("maritalStatus", status)
                  }}
                  options={MARITAL_STATUS}
                />
              ),
              complexion: (
                <SelectGroup
                  value={preferenceStore.complexion}
                  onChange={(status) => {
                    preferenceStore.set("complexion", status)
                  }}
                  options={COMPLEXION}
                />
              ),
            }[currentStep]
          }
        </View>
        <View
          style={{
            marginBottom: spacing[7],
            marginHorizontal: "10%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            preset={["large", currentStep === SETTINGS_LIST[0] ? "muted" : "bold"]}
            onPress={() => {
              if (currentStep !== SETTINGS_LIST[0]) {
                setStep(SETTINGS_LIST[SETTINGS_LIST.indexOf(currentStep) - 1])
              }
            }}
          >
            Back
          </Text>
          <Text
            preset={[status.isPending ? "muted" : "primary", "large", "bold"]}
            onPress={() => {
              if (currentStep !== SETTINGS_LIST[SETTINGS_LIST.length - 1]) {
                setStep(SETTINGS_LIST[SETTINGS_LIST.indexOf(currentStep) + 1])
              } else if (!status.isPending) {
                sevicesCaller(preferenceStore)
              }
            }}
          >
            {currentStep !== SETTINGS_LIST[SETTINGS_LIST.length - 1] ? "Next" : "Done"}
          </Text>
        </View>
      </Screen>
    )
  },
)

const CheckboxView = ({ status, label, ...rest }) => {
  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: status ? color.primary : color.background,
        paddingRight: spacing[1],
        margin: spacing[2],
      }}
    >
      <View
        style={[
          styles.checkboxContainer,
          status ? { borderColor: color.primary } : { borderWidth: 2 },
        ]}
      >
        <Checkbox status={status ? "checked" : "unchecked"} color={color.primary} {...rest} />
        <Text>{label}</Text>
      </View>
    </View>
  )
}

const SelectGroup = ({ value, onChange, options }) => {
  return (
    <View>
      <Text preset={["large"]} style={{ paddingStart: spacing[2] }}>
        Select one of the city
      </Text>
      <FlatList
        data={options}
        renderItem={({ item: e }) => (
          <CheckboxView
            label={e}
            status={value === e}
            onPress={() => onChange(value === e ? undefined : e)}
          />
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
        extraData={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    borderColor: color.line,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row",
    padding: spacing[2],
    alignItems: "center",
    backgroundColor: color.background,
  },
})
