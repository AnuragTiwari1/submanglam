import { AppStateModel, AppState } from "./app-state-model"

test("can be created", () => {
  const instance: AppState = AppStateModel.create({})

  expect(instance).toBeTruthy()
})
