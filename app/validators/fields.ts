import * as yup from "yup"

const REQUIRED_FEILD = "This field is required"
const INVALID_FEILD = "This field is invalid"
export const nameValidator = yup
  .string()
  .required(REQUIRED_FEILD)
  .max(50, "Must be less than 50 characters")
  .matches(/^[a-zA-Z ]*$/, INVALID_FEILD)

export const passwordValidator = yup.string().required(REQUIRED_FEILD)

export const emailValidator = yup.string().required(REQUIRED_FEILD).email(INVALID_FEILD)
