import React from 'react';
import { TextStyle } from 'react-native';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

export type IconType = 'FontAwesome5' | 'Feather';

interface IconProps {
  name: any;
  size?: number;
  color?: string;
  type?: IconType;
  style?: TextStyle;
};

const Icon = ({ name, size = 20, color = 'white', type = 'FontAwesome5', style }: IconProps) => {
  switch (type) {
    case 'FontAwesome5':
      return (
        <FontAwesome5 
          name={name} 
          size={size} 
          color={color} 
          style={style} 
        />
      );

    default:
      return (
        <Feather 
          name={name} 
          size={size} 
          color={color} 
          style={style} 
        />
      );
  }
};

export default Icon;
