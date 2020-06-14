import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */

export const PreferenceModel = types
  .model("Preference", {
    maritalStatus: types.maybe(types.string),
    city: types.maybe(types.string),
    ageFrom: types.maybe(types.number),
    ageTo: types.maybe(types.number),
    minHeight: types.maybe(types.number),
    maxHeight: types.maybe(types.number),
    complexion: types.maybe(types.string),
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    set(key, value) {
      self[key] = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PreferenceType = Instance<typeof PreferenceModel>
export interface Preference extends PreferenceType {}
type PreferenceSnapshotType = SnapshotOut<typeof PreferenceModel>
export interface PreferenceSnapshot extends PreferenceSnapshotType {}
