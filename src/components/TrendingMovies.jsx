import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import MovieCard from './MovieCard';
import i18n from 'i18next';


export default function TrendingMovies({data}) {
  const navigation = useNavigation();

  const {width} = useWindowDimensions();

  const handleClick = item => {
    navigation.navigate('Movie', item);
  };

  return (
    <View className="mb-8">
      <Text className="text-black text-xl mx-4 mb-5">
        {i18n.t('home.trending')}
      </Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
}
