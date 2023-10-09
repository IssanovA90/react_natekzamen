import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

export const Layout = (props) => {
  const { children, style } = props;
  return <View style={{
    ...style,
  }}>{children}</View>;
};

export const InputV1 = (props) => {
  const { onChangeText, value, placeholder, style } = props;
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={style}

    />
  );
};

export const ButtonV1 = (props) => {
  const { title, onPress, disabled, style } = props;
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

