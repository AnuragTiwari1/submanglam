import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { AppStateModel, DEFAULT_APPSTATE } from "../app-state-model"
import { AuthModel } from "../auth"
import { UserProfileModel } from "../user-profile"
import { PeopleModel } from "../people"
import { PersonDetailsModel } from "../person-details"
import { ActionsModel } from "../actions"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  appStateStore: types.optional(AppStateModel, DEFAULT_APPSTATE),
  authStore: types.optional(AuthModel, {}),
  userProfile: types.optional(UserProfileModel, {}),
  userProfileForm: types.optional(UserProfileModel, {}),
  peopleStore: types.optional(PeopleModel, {}),
  personStore: types.optional(PersonDetailsModel, {}),
  actionStore: types.optional(ActionsModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
