import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import theme from '../../constants/theme';

const {colors} = theme;

export default function Select({value, onChange, list, placeholder = ''}) {
  return (
    <View style={styles.selectContainer}>
      <Picker
        prompt={placeholder}
        style={styles.select}
        selectedValue={value}
        onValueChange={itemValue => onChange(itemValue)}>
        {list.map(item => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
        {/* <Picker.Item style={styles.select} label="JavaScript" value="js" /> */}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    borderColor: colors.primary,
    color: colors.black,
  },
  selectContainer: {
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderColor: colors.primary,
  },
});
