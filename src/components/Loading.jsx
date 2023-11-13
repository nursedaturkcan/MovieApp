import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {theme} from '../theme';

export default function Loading() {
  const {width, height} = useWindowDimensions();

  return (
    <View
      style={{width, height}}
      className="flex-row absolute justify-center items-center">
      <Progress.CircleSnail
        color={theme.background}
        thickness={12}
        size={160}
      />
    </View>
  );
}
