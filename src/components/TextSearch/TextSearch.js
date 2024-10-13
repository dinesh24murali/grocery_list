import React from 'react';
import {StyleSheet, View} from 'react-native';

import TextInput from '../../components/Input/TextInput';
import IconButton from '../../components/Button/IconButton';
import Icon from '../../components/Icons/Icon';

export default function TextSearch({searchText, onChange, style = null}) {
  let tempStyle = styles.searchContainer;

  if (style) {
    tempStyle = {
      ...styles.searchContainer,
      ...style,
    };
  }

  return (
    <View style={tempStyle}>
      <TextInput
        style={{alignItems: 'baseline', flex: 6, marginTop: 0}}
        value={searchText}
        onChange={value => onChange(value)}
      />
      {searchText ? (
        <IconButton
          style={{marginTop: 0, marginLeft: 12}}
          onPress={() => onChange('')}>
          <Icon name="times" size={22} />
        </IconButton>
      ) : (
        <IconButton style={{marginTop: 0, marginLeft: 12}}>
          <Icon name="search" size={22} />
        </IconButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
