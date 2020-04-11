import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { color } from "../../theme"

/**
 * Model description here for TypeScript hints.
 */
export const AppStateModelModel = types
  .model("AppStateModel", {
    toast: {
      text: types.string;
      styles: keyof typeof(color)
    },
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AppStateModelType = Instance<typeof AppStateModelModel>
export interface AppStateModel extends AppStateModelType {}
type AppStateModelSnapshotType = SnapshotOut<typeof AppStateModelModel>
export interface AppStateModelSnapshot extends AppStateModelSnapshotType {}
