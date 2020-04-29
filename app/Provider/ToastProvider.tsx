import React from "react"
import { Snackbar } from "react-native-paper"
import { useStores } from "../models/root-store"
import { ViewStyle } from "react-native"
import { palette } from "../theme/palette"
import { DEFAULT_APPSTATE } from "../models/app-state-model"
import { observer } from "mobx-react-lite"

const getStyles = (style: keyof typeof palette): ViewStyle => {
  return typeof style === "string"
    ? {
        backgroundColor: palette[style],
      }
    : ((style || {}) as ViewStyle)
}

export const ToastProvider = observer(() => {
  const { appStateStore } = useStores()
  const {
    toast: { text, styles },
  } = appStateStore

	console.log('the style>>>',styles,getStyles(styles))

  return (
    <Snackbar
      visible={text.length > 0}
      style={getStyles(styles || "success")}
      duration={2000}
      onDismiss={() => appStateStore.toast.setToast(DEFAULT_APPSTATE.toast)}
    >
      {text}
    </Snackbar>
  )
})
