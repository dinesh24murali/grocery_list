import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
const {colors} = theme;

const plusIcon = ({size = 30}) => {
  return <Icon name="plus" size={size} color={colors.primary} />;
};

export default plusIcon;
