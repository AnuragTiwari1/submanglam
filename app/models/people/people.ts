import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */

const personModal = types.model("person", {
  id: types.optional(types.string, ""),
  profilepic: types.optional(types.string, "profile.png"),
  name: types.optional(types.string, ""),
  age: types.optional(types.string, "0"),
  height: types.optional(types.string, "0"),
  weight: types.optional(types.string, "0"),
  profession: types.optional(types.string, "Student"),
  native: types.optional(types.string, ""),
})

export const PeopleModel = types
  .model("People", {
    peoplelist: types.optional(types.array(personModal), []),
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setPeoples(newList) {
      self.peoplelist = newList
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PeopleType = Instance<typeof PeopleModel>
export interface People extends PeopleType {}
type PeopleSnapshotType = SnapshotOut<typeof PeopleModel>
export interface PeopleSnapshot extends PeopleSnapshotType {}
