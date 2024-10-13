import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

export default function Index({title, ...props}) {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? '#E3F2FD' : '#fff'},
        styles.btn,
      ]}
      {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    border: '1px solid rgb(209,213,219)',
    borderRadius: 12,
    padding: 12,
    textAlign: 'center',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#111827',
  },
});
