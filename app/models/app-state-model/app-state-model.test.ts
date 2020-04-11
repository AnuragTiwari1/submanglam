import { AppStateModelModel, AppStateModel } from "./app-state-model"

test("can be created", () => {
  const instance: AppStateModel = AppStateModelModel.create({})

  expect(instance).toBeTruthy()
})