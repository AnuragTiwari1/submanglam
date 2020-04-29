import * as yup from "yup"
import * as fields from "./fields"
import { SignFormShape } from "../screens"

export const registerForm: yup.ObjectSchema<SignFormShape> = yup.object().shape({
  email: fields.emailValidator,
  name: fields.nameValidator,
  password: fields.passwordValidator,
})
