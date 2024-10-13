import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import theme from '../../constants/theme';

const {colors} = theme;

export default function Index({children, color, value, onChange = () => {}}) {
  return (
    <View>
      <CheckBox
        style={styles.checkboxContainer}
        disabled={false}
        value={value}
        tintColors={{
          true: color ? color : colors.white,
          false: color ? color : colors.white,
        }}
        onValueChange={event => onChange(event)}
      />
      {children ? children : ''}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    color: colors.white,
  },
});
