import React from "react"
import { View } from "react-native"
import { Text } from "../text/text"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { spacing, color } from "../../theme"
import { CloseIcon } from "../icon/icon"
import { TextInput } from "react-native-paper"

export interface IFakeSelectInput {
  value: any
  placeholder: string
  label: string
  errorMessage?: string
  children: (showModal: boolean, setShowModal: Function) => void
  renderItem?: (x: any) => React.ReactElement
  isDisabled?: boolean
  onClear?: Function
  clearable?: boolean
  noLabel?: boolean
}

export const FakeSelectInput = (props: IFakeSelectInput) => {
  const {
    value,
    placeholder,
    label,
    errorMessage,
    children,
    isDisabled = false,
    renderItem = () => <></>,
    clearable = false,
    onClear = () => {},
    noLabel = false,
  } = props

  const inputRef = React.createRef()

  const [showModal, setShowModal] = React.useState(false)
  React.useEffect(() => {
    if (!showModal) {
      inputRef.current.blur()
    }
  }, [showModal])

  console.log("the value<>>>>>", value)

  return (
    <TouchableWithoutFeedback
      style={{ marginVertical: `${spacing[1]}%` }}
      onPress={() => {
        console.log("hijuh")
      }}
    >
      {/* {!noLabel && <Text preset={["label"]}>{label}</Text>} */}

      {/* {clearable && !!value && (
          <TouchableOpacity
            style={{ paddingHorizontal: spacing[1] }}
            onPress={e => (clearable && typeof onClear === "function" ? onClear() : {})}
          >
            {clearable && <CloseIcon />}
          </TouchableOpacity>
        )} */}
      {/* {typeof value === "string" ? (
          <Text
            preset={value ? (isDisabled ? ["muted", "text"] : ["normal"]) : ["muted", "text"]}
            style={{ marginLeft: `${value ? 0 : spacing[1]}%`, ...placeholderStyle }}
          >
            {value || placeholder || label}
          </Text>
        ) : !!value ? (
          renderItem(value)
        ) : (
          <Text
            preset={["muted", "text"]}
            style={{
              marginLeft: `${spacing[1]}%`,
              ...placeholderStyle,
            }}
          >
            {placeholder || label}
          </Text>
        )} */}
      <TextInput
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        style={{ backgroundColor: color.palette.white, color }}
        value={value}
        disabled
        onFocus={() => {
          setShowModal(true)
        }}
      />

      {/* {!!errorMessage && <Text preset={["validationError"]}>{errorMessage}</Text>} */}
      {children(showModal, setShowModal)}
    </TouchableWithoutFeedback>
  )
}
