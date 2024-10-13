import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';

const {colors} = theme;

const IconWrapper = ({size = 30, name, color = colors.primary}) => {
  return <Icon name={name} size={size} color={color} />;
};

export default IconWrapper;
