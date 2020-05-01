import { ImageProps } from "react-native"
import {COMPLEXION, BLOODGROUP} from "../constants"

type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

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



//forms types

export interface IAddPersonalDetailShape {
	gender:'male'|'female'
	dob: string;
	age:number;
	height:number;
	weight:number;
	complexion:ElementType<typeof COMPLEXION>;
	bloodgroup:ElementType<typeof BLOODGROUP>;
	physically:'Yes'|'No';
	hobbies:string;
	address:string;
}
