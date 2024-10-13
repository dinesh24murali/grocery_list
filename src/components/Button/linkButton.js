import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

export default function Index({title, ...props}) {
  return (
    <Pressable
      style={({pressed}) => [{color: pressed ? '#E3F2FD' : '#fff'}, styles.btn]}
      {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
  },
  text: {
    textDecorationLine: 'underline',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#fff',
  },
});
