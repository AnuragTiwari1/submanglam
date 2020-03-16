// @flow
import React from "react"
import { View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { IUserStory } from "../types"
import Stories2 from "./components/Stories2"

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

const stories: IUserStory[] = [
  {
    id: "1",
    source: { uri: "https://i.pinimg.com/originals/fb/53/fe/fb53fe5eb1f6b7c81bffc653c5149e88.jpg" },
    basicInfo: {
      name: "Ichika Nova",
      age: 24,
      height: {
        foot: 5,
        inch: 8,
      },
      profession: "Software Developer",
      weight: 64,
    },
  },
  {
    id: "2",
    source: { uri: "https://i.pinimg.com/236x/b4/53/55/b453553626e6ec57ca7835ad9b71a24d.jpg" },
    basicInfo: {
      name: "Yua Takahashi",
      age: 24,
      height: {
        foot: 5,
        inch: 8,
      },
      profession: "Software Developer",
      weight: 64,
    },
  },
  {
    id: "3",
    source: { uri: "https://i.pinimg.com/originals/e0/8a/07/e08a0787ab994363d58162b7e58e217d.jpg" },
    basicInfo: {
      name: "Erzza Scarlet",
      age: 24,
      height: {
        foot: 5,
        inch: 8,
      },
      profession: "Software Developer",
      weight: 64,
    },
  },
  {
    id: "4",
    source: { uri: "https://i.pinimg.com/564x/c1/e1/50/c1e150a28e728df06b9c49b5e735b2ee.jpg" },
    basicInfo: {
      name: "Yukino Yukinoshita",
      age: 21,
      height: {
        foot: 6,
        inch: 0,
      },
      profession: "Student",
      weight: 54,
    },
  },
  {
    id: "5",
    source: { uri: "https://i.pinimg.com/originals/11/9a/4b/119a4b42d90bce485c9230ee1e439f34.jpg" },
    basicInfo: {
      name: "Yui Yuigahama",
      age: 26,
      height: {
        foot: 5,
        inch: 6,
      },
      profession: "Graphic Designer",
      weight: 61,
    },
  },
  {
    id: "6",
    source: { uri: "https://i.pinimg.com/564x/67/e5/d3/67e5d3d6893d5ea6950aff17a9b3c6ab.jpg" },
    basicInfo: {
      name: "Akira Isagami",
      age: 24,
      height: {
        foot: 5,
        inch: 8,
      },
      profession: "Software Developer",
      weight: 64,
    },
  },
]

export const WelcomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stories2 {...{ stories }} />
    </View>
  )
}
