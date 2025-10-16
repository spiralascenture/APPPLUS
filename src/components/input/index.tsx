import React, { ReactNode, forwardRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TextInput as RNTextInput,
  Text,
} from "react-native";
import { style } from "./styles";

type Props = TextInputProps & {
  icon?: ReactNode;
  rightIcon?: ReactNode;
  backgroundColor?: string;
  errorMessage?: string;
};

const Input = forwardRef<RNTextInput, Props>(
  (
    {
      icon,
      rightIcon,
      backgroundColor = "#fff",
      onChangeText,
      value,
      onBlur,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <View>
        <View style={[style.container, { backgroundColor, flexDirection: 'row', alignItems: 'center' }]}> 
          <View style={style.icon}>{icon}</View>
          <TextInput
            ref={ref}
            style={[style.input, { flex: 1 }]}
            placeholderTextColor="#999"
            onChangeText={onChangeText}
            value={value}
            onBlur={onBlur}
            {...rest}
          />
          {rightIcon && (
            <View style={{ marginLeft: 8 }}>{rightIcon}</View>
          )}
        </View>
        {errorMessage && (
          <Text style={{ color: "red", marginTop: 4 }}>{errorMessage}</Text>
        )}
      </View>
    );
  }
);

export default Input;
