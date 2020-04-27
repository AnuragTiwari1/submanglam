import React from "react"
import { Snackbar } from "react-native-paper"
import { useStores } from "../models/root-store"
import { ViewStyle } from "react-native"
import { palette } from "../theme/palette"
import { DEFAULT_APPSTATE } from "../models/app-state-model"

const getStyles = (style: keyof typeof palette): ViewStyle => {
  return typeof style === "string"
    ? {
        backgroundColor: palette[style],
      }
    : ((style || {}) as ViewStyle)
}

export const ToastProvider = ({ toast }) => {
  const { appStateStore } = useStores()
  return (
    <Snackbar
      visible={!!toast}
      style={getStyles(toast?.styles ?? "success")}
      duration={5000}
      onDismiss={() => appStateStore.setToast(DEFAULT_APPSTATE.toast)}
    >
      {toast?.text}
    </Snackbar>
  )
}
