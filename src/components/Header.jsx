import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

export default function header() {
  return (
    <SafeAreaView
      className={
        'absolute z-20 w-full flex-row justify-between items-center px-4' +
        topMargin
      }>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="rounded-full p-1 bg-neutral-800 ml-4">
        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsFavorite(prevState => !prevState)}>
        <HeartIcon size={35} color={isFavorite ? theme.background : 'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
