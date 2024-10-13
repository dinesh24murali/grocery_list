import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import theme from '../../constants/theme';

const {colors} = theme;

export default function Input({
  value,
  onChange,
  keyboardType = undefined,
  style,
}) {
  let tempStyle = styles.input;

  if (style) {
    tempStyle = {
      ...styles.input,
      ...style,
    };
  }

  return (
    <TextInput
      style={tempStyle}
      keyboardType={keyboardType}
      onChangeText={onChange}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    color: colors.black,
    borderColor: colors.primary,
  },
});
