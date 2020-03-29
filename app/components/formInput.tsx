import React from "react"
import { TextInput } from "react-native-paper"
import { useFormContext, Controller } from "react-hook-form"
import { spacing } from "../theme"
import { View } from "react-native"

interface FormInputProps extends React.ComponentProps<typeof TextInput> {
  name: string
  required?: boolean
  defaultValue?: string
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
          errorMessage={errors?.[name]?.message}
          placeholder={placeholder}
          {...rest}
        />
      }
      name={name}
      onChange={
        onChange && typeof onChange === "function"
          ? onChange
          : args => {
              return {
                value: args[0].nativeEvent.text,
              }
            }
      }
      {...{ defaultValue, control }}
    />
  )
}

export const StyledTextInput = props => {
  const { containerStyle, ...rest } = props
  return (
    <View style={{ paddingVertical: spacing[1], ...containerStyle }}>
      <TextInput {...rest} />
    </View>
  )
}
