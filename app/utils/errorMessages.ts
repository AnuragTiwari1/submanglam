import get from "lodash/get"
export const errorMessage = (e: any) => {
  try {
    if (e.response && e.response.data) {
      return e.response.data.message || e.message
    }
    return e.message
  } catch {
    return e
  }
}

export const formErrorMessage = get
