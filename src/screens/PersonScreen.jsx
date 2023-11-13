import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const topMargin = Platform.OS === 'ios' ? '' : 'mt-3';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/outline';
import {theme} from '../theme';
import Loading from '../components/Loading';
import {fetchPersonDetails, fetchPersonMovies} from '../api/moviedb';
import MovieList from '../components/MovieList';
import useMovie from '../store/movie';
import useAppSettings from '../store/appSettings';
import i18next from 'i18next';
import {isRTL} from '../i18n';

export default function PersonScreen() {
  const {params: item} = useRoute();

  const {loading, setLoading} = useAppSettings(state => state);

  const navigation = useNavigation();

  const {width, height} = useWindowDimensions();

  const {personMovies, setPersonMovies, person, setPerson} = useMovie(
    state => state,
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);

    if (data) {
      setPerson(data);
    }
  };
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);

    if (data?.cast) {
      setPersonMovies(data.cast);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item?.id);
    getPersonMovies(item?.id);
  }, [item]);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 25}}>
      <SafeAreaView
        className={
          'absolute z-20 w-full flex-row justify-between items-center px-4' +
          topMargin
        }>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-1 bg-neutral-800 ml-4">
          <ChevronLeftIcon size={32} strokeWidth={2.5} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavorite(prevState => !prevState)}
          className="rounded-full p-1 bg-neutral-800 mr-2">
          <HeartIcon
            size={35}
            color={isFavorite ? theme.background : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center">
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w342${item?.profile_path}`,
                }}
                style={{width, height: height * 0.55}}
                className="rounded-3xl"
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-neutral-900 font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-yellow-500 rounded-full">
            <View className="border-r-2 border-r-neutral-900 px-2 items-center">
              <Text className="text-neutral-900 font-semibold ">
                {i18next.t('person.gender')}
              </Text>
              <Text className="text-white text-sm">
              {i18next.t(person?.gender === 1 ? 'person.female' : 'person.male')}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-900 px-2 items-center">
              <Text className="text-neutral-900 font-semibold ">
                {i18next.t('person.birthday')}
              </Text>
              <Text className="text-white text-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-900 px-2 items-center">
              <Text className="text-neutral-900 font-semibold ">
                {i18next.t('person.knownFor')}
              </Text>
              <Text className="text-white text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-neutral-900 font-semibold ">
                {i18next.t('person.popularity')}
              </Text>
              <Text className="text-white text-sm">
                {person?.popularity?.toFixed(2)}
              </Text>
            </View>
          </View>

          {person?.biography && (
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-neutral-900 text-lg">
                {i18next.t('person.biography')}
              </Text>
              <Text className="text-neutral-400 tracking-wide">
                {person?.biography}
              </Text>
            </View>
          )}
          {person?.id && personMovies?.length > 0 && (
            <View className="my-6 ml-4 space-y-2">
              <MovieList
                title={i18next.t('movie.knownJobs')}
             
                hideSeeAll
                data={personMovies}
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
