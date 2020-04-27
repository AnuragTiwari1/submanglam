import { Instance, SnapshotOut, types } from "mobx-state-tree"
import omit from "ramda/src/omit"

/**
 * this model contains possible state
 * the app can be in
 * eg: toast, network error
 */

export const DEFAULT_APPSTATE = {
  toast: {
    text: "",
    styles: "",
  },
}

const toastModal = types.model("toastModal", {
  text: types.string,
  styles: types.string,
})

export const AppStateModel = types
  .model("AppStateModel", {
    toast: types.optional(toastModal, DEFAULT_APPSTATE.toast),
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setToast(newToast) {
      self.toast = newToast
    },
  }))
  .postProcessSnapshot(omit(["toast"]))

type AppStateType = Instance<typeof AppStateModel>
export interface AppState extends AppStateType {}
type AppStateSnapshotType = SnapshotOut<typeof AppStateModel>
export interface AppStateSnapshot extends AppStateSnapshotType {}
