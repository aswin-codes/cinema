import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Box, Text, IconButton, Icon, Button, useToast } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieDetails,
  addToWatchList,
  resetAddToListStatus,
} from '../../redux/movieDetailsSlice';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const toast = useToast();
  
  const {
    movie,
    loading,
    error,
    addToListLoading,
    addToListError,
    addToListSuccess,
  } = useSelector((state) => state.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (addToListSuccess) {
      toast.show({
        description: "Successfully added to your list",
        placement: "top",
      });
      dispatch(resetAddToListStatus());
    }
    if (addToListError) {
      toast.show({
        description: addToListError,
        placement: "top",
        status: "error",
      });
      dispatch(resetAddToListStatus());
    }
  }, [addToListSuccess, addToListError, toast, dispatch]);

  const handleAddToList = (status) => {
    dispatch(addToWatchList({ movieId, status }));
  };

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Box flex={1} bg="white">
      {/* Header */}
      <Box 
        flexDirection="row" 
        alignItems="center" 
        p={4} 
        my={4}
        borderBottomWidth={1}
        borderBottomColor="gray.200"
      >
        <IconButton
          icon={<Icon as={MaterialIcons} name="arrow-back" />}
          onPress={() => navigation.goBack()}
        />
        <Text fontSize="xl" fontWeight="bold" ml={4}>
          Movie Details
        </Text>
      </Box>

      <ScrollView>
        <Box p={4}>
          {/* Movie Poster */}
          <Image
            source={{ uri: movie.poster_url }}
            style={styles.poster}
            resizeMode="cover"
          />

          {/* Movie Info */}
          <Box mt={4}>
            <Text fontSize="2xl" fontWeight="bold">
              {movie.title}
            </Text>
            
            <Box flexDirection="row" mt={2}>
              <Text
                bg="gray.200"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
              >
                {movie.type.toUpperCase()}
              </Text>
            </Box>

            <Text mt={4} fontSize="md" color="gray.600">
                {movie.description}
            </Text>
          </Box>

          {/* Action Buttons */}
          <Box flexDirection="row" mt={6} justifyContent="space-between">
            <Button
              flex={1}
              mr={2}
              onPress={() => handleAddToList('To Watch')}
              isLoading={addToListLoading}
              colorScheme="blue"
            >
              Add to Watch
            </Button>
            <Button
              flex={1}
              ml={2}
              onPress={() => handleAddToList('Watched')}
              isLoading={addToListLoading}
              colorScheme="green"
            >
              Mark as Watched
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 12,
  },
});

export default MovieDetailsScreen;