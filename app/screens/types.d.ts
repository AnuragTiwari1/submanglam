import { ImageProps } from "react-native"

export type IBasicUserInfo = {
  name: string
  height: {
    foot: number
    inch: number
  }
  age: number
  weight: number
  profession: string
}

export type IUserStory = {
  id: string
  source: Pick<ImageProps, "source">
  basicInfo: IBasicUserInfo
}
