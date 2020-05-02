import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { getSupportedBiometryType } from "react-native-keychain"

/**
 * Model description here for TypeScript hints.
 */
export const UserProfileModel = types
  .model("UserProfile", {
    gender: types.optional(types.string, ""),
    location: types.optional(types.string, "Pune"),
    age: types.optional(types.number, 0),
    height: types.optional(types.number, 0),
    weight: types.optional(types.number, 0),
    complexion: types.optional(types.string, ""),
    bloodgroup: types.optional(types.string, ""),
    hobbies: types.optional(types.string, ""),
    address: types.optional(types.string, ""),
    physically: types.optional(types.string, ""),
    dob: types.optional(types.string, ""),
    profession: types.optional(types.string, ""),
    officename: types.optional(types.string, ""),
    salary: types.optional(types.number, 0),
    education: types.optional(types.string, ""),
    fatherprofession: types.optional(types.string, ""),
    motherprofession: types.optional(types.string, ""),
    expectations: types.optional(types.string, ""),
    parentsmob1: types.optional(types.string, ""),
    parentsmob2: types.optional(types.string, ""),
    profilepic: types.optional(types.string, ""),
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    updateProfile(newData) {
      const keys = Object.keys(newData)

      keys.forEach((e, i) => {
        self[e] = newData[e] || self[e]
      })
    },
    reset() {
      self = {}
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserProfileType = Instance<typeof UserProfileModel>
export interface UserProfile extends UserProfileType {}
type UserProfileSnapshotType = SnapshotOut<typeof UserProfileModel>
export interface UserProfileSnapshot extends UserProfileSnapshotType {}
