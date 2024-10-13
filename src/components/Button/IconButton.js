import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

export default function Index({children, style, ...props}) {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? '#E3F2FD' : '#fff'},
        styles.btn,
        style ? style : {},
      ]}
      {...props}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    border: '1px solid rgb(209,213,219)',
    borderRadius: 12,
    padding: 8,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
});
