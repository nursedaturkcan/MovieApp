import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {fallbackPoster} from '../api/moviedb';
import i18 from 'i18next';

export default function MovieList({data, title, hideSeeAll}) {
  const navigation = useNavigation();

  const {width, height} = useWindowDimensions();


  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-neutral-900 text-lg">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate("AllMovies", { data })}>
            <Text style={styles.text} className="text-lg">
              {i18.t('common.seeAll')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: '15'}}
        showsHorizontalScrollIndicator={false}>
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movie', item)}>
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: item?.poster_path
                      ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                      : fallbackPoster,
                  }}
                  style={{width: width * 0.33, height: height * 0.22}}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-900 ml-1">
                  {item?.title?.length > 15
                    ? item?.title.slice(0, 15) + '...'
                    : item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
