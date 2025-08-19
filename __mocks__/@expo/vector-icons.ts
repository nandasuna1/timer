// __mocks__/@expo/vector-icons.ts
import React from 'react';
import { View } from 'react-native';

const createIcon = (name: string) => {
  const Icon = ({ size = 24, color, ...props }: any) =>
    React.createElement(View, { ...props, style: { width: size, height: size } });
  Icon.displayName = name; // define displayName
  return Icon;
};

export const Ionicons = createIcon('Ionicons');
export const AntDesign = createIcon('AntDesign');
export const FontAwesome = createIcon('FontAwesome');
export const MaterialIcons = createIcon('MaterialIcons');
