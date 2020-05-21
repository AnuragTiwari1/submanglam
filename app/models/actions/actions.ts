import { Instance, SnapshotOut, types } from "mobx-state-tree"
import omit from "ramda/src/omit"

/**
 * Model description here for TypeScript hints.
 */
export const ActionsModel = types
  .model("Actions", {
    userActions: types.frozen<{ [id: string]: string }>(), // wil be used to store user actions across the platform
    appActions: types.map(types.string), // will fetch actions which app will use for ads and matches mostly a websocket connection
  })
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addUserActions(newActions) {
      self.userActions = {
        ...self.userActions,
        ...newActions,
      }
    },
    setUserActions(newActions) {
      self.userActions = {
        ...newActions,
      }
    },
    deleteUserAction(id) {
      self.userActions = omit([id], self.userActions)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(omit(["appActions"]))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *   */

type ActionsType = Instance<typeof ActionsModel>
export interface Actions extends ActionsType {}
type ActionsSnapshotType = SnapshotOut<typeof ActionsModel>
export interface ActionsSnapshot extends ActionsSnapshotType {}
