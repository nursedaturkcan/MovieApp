
import React from 'react';
import { TouchableOpacity, Image, useWindowDimensions } from 'react-native';

const MovieCard = ({ item, handleClick, customStyle }) => {
  const { width, height } = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={() => handleClick(item)}
      style={[{ width: width * 0.5, padding: 4 }, customStyle]} 
    >
      <Image
        source={{
          uri: `https://www.themoviedb.org/t/p/w500/${item.poster_path}`,
        }}
        style={{ width: '100%', height: height * 0.4, borderRadius: 8 }}
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
