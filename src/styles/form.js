import {StyleSheet} from 'react-native';

import theme from '../constants/theme';

const {colors} = theme;

const form = StyleSheet.create({
  label: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
    // alignItems: 'flex-start'
  },
  btnText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '900',
    marginLeft: 6,
  },
});

export default form;
