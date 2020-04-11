import React from "react"
import { Controller } from "react-hook-form"
import { TouchableOpacity, View } from "react-native"
import ImagePickerLib from "react-native-image-picker"
import { Avatar } from "react-native-paper"
import { errorMessage } from "../../utils/errorMessages"
import { spacing } from "../../theme"

export interface File {
  uri: string
  size: number
  name: string
  type: string
}

const emptyImage =
  "https://previews.123rf.com/images/blankstock/blankstock1811/blankstock181101708/112886250-add-user-line-icon-profile-avatar-sign-male-person-silhouette-symbol-gradient-pattern-line-button-ad.jpg"

export const FormImagePicker = ({ name, defaultValue, control, ...rest }) => {
  return (
    <Controller
      as={<ImagePicker {...rest} />}
      name={name}
      valueName="source"
      onChangeName="setSource"
      onChange={(args: [File]) => ({
        name: args[0].name,
        size: args[0].size,
        uri: args[0].uri,
        type: args[0].type,
      })}
      {...{ defaultValue, control }}
    />
  )
}

const getSource = (source, defaultImag) => {
  return typeof source?.name === "string" //is file
    ? { uri: source.uri }
    : typeof source === "string" && source //is string
    ? { uri: source }
    : { uri: defaultImag }
}

const imagePickerOptions = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  rotation: 90,
}

export const ImagePicker = ({ source, handleReject, setSource, maxSize = 1 }) => {
  const handleImage = (selection: any) => {
    //handle cancel
    if (selection.didCancel) {
      throw new Error("Image selection canceled by user")
    }
    //handle error
    else if (selection.error) {
      throw new Error(errorMessage(selection.error))
    }
    //handle image size errors
    else if (selection.fileSize > maxSize * 1000 * 1000) {
      throw new Error(`Must be less than ${maxSize}MB`)
    }
    //set image
    else {
      setSource({
        size: selection.fileSize,
        name: selection.fileName,
        type: selection.type,
        uri: selection.uri,
      } as File)
    }
  }

  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: "#000000",
          padding: `${spacing[3]}%`,
          borderRadius: 5,
        }}
        onPress={() => {
          ImagePickerLib.showImagePicker(imagePickerOptions, handleImage)
        }}
      >
        <Avatar.Image
          size={200}
          source={getSource(source, emptyImage)}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </View>
  )
}
