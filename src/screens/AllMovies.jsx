import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Header from "../components/Header"


const AllMovies = ({ route }) => {
  const { data } = route.params;
  const navigation=useNavigation();
  const handleClick = data => {
    navigation.navigate('Movie', data);
  };
  console.log("All movies", data);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
   
      <View className="flex-row flex-wrap">
      {data.map((movie, index) => (
        <MovieCard
          key={movie.id}
          item={movie}
          handleClick={handleClick}
          customStyle={{ margin: 4 ,flexBasis: '48%'}} 
        />
      ))}
    </View>
      </ScrollView>
   
  </SafeAreaView>
  );
};

export default AllMovies;
