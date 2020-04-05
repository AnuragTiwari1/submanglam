import React from "react"
import { TextInput } from "react-native-paper"
import { useFormContext, Controller, ControllerProps } from "react-hook-form"
import { spacing, color } from "../theme"
import { View } from "react-native"
import { Text } from "./text/text"

interface FormInputProps extends React.ComponentProps<typeof TextInput>, ControllerProps<any> {
  required?: boolean
  placeholder?: string
  value?: string
  label?: string
}

export const inputContainerStyle={
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0.4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 1.65,
  elevation: 2,
  backgroundColor: color.palette.white,
  borderWidth: 0.4,
  marginVertical: `${spacing[0]}%`,
}

export const FormInput = (props: FormInputProps) => {
  const {
    name,
    required = false,
    label,
    placeholder = label,
    defaultValue = "",
    value,
    onChange,
    ...rest
  } = props

  const { errors, control } = useFormContext()

  return (
    <Controller
      as={
        <StyledTextInput
          label={required ? `${label}*` : label}
          errorMessage={`${errors?.[name]?.message}`}
          placeholder={placeholder}
          style={inputContainerStyle}
          {...rest}
        />
      }
      name={name}
      onChange={
        onChange && typeof onChange === "function"
          ? onChange
          : (args) => {
              return {
                value: args[0].nativeEvent.text,
              }
            }
      }
      {...{ defaultValue, control }}
    />
  )
}

export const StyledTextInput = (props) => {
  const { containerStyle, ...rest } = props
  return (
    <View style={{ paddingVertical: spacing[1], ...containerStyle }}>
      <TextInput {...rest} />
    </View>
  )
}

export const FormTextArea = (props: FormInputProps & { limit?: number }) => {
  const { watch } = useFormContext()
  const value = watch(props.name) || ""
  const { limit = 500 } = props
  return (
    <>
      <FormInput
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        inputContainerStyle={{ height: 350 }}
        {...props}
      />
      <Text
        preset={["small", "muted"]}
        style={{ alignSelf: "flex-end", paddingHorizontal: `${spacing[0]}%` }}
      >
        {value.length}/{limit.toString()}
      </Text>
    </>
  )
}
