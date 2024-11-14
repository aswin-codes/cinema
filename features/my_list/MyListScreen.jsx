import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Text, 
  HStack, 
  Pressable, 
  FlatList,
  VStack,
  Image,
  Spinner,
  Icon,
  IconButton,
  useToast,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchMyList } from '../../redux/myListSlice';

const MyListScreen = () => {
  const [activeTab, setActiveTab] = useState('toWatch');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  
  const { toWatch, watched, loading, error } = useSelector((state) => state.myList);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await dispatch(fetchMyList()).unwrap();
    } catch (err) {
      toast.show({
        title: "Error",
        description: "Failed to load your list. Please try again.",
        status: "error"
      });
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const TabButton = ({ title, isActive, onPress }) => (
    <Pressable
      flex={1}
      onPress={onPress}
      py={3}
    >
      <Box
        alignItems="center"
        borderBottomWidth={2}
        borderBottomColor={isActive ? "blue.500" : "transparent"}
      >
        <Text
          mb={5}
          color={isActive ? "blue.500" : "gray.500"}
          fontWeight={isActive ? "bold" : "normal"}
        >
          {title} ({activeTab === 'toWatch' ? toWatch.length : watched.length})
        </Text>
      </Box>
    </Pressable>
  );

  const ListItem = ({ item }) => (
    <Pressable 
      onPress={() => {/* Navigate to details */}}
      mb={4}
    >
      <HStack space={3} alignItems="center" bg="white" p={2} rounded="lg" shadow={1}>
        <Image 
          source={{ uri: item.poster_url }}
          alt={item.title}
          width={100}
          height={150}
          rounded="md"
          fallbackSource={{
            uri: "https://via.placeholder.com/100x150"
          }}
        />
        <VStack flex={1} space={2}>
          <Text fontSize="lg" fontWeight="bold" numberOfLines={2}>
            {item.title}
          </Text>
          <Text fontSize="xs" color="gray.500">
            Added: {formatDate(item.updatedAt)}
          </Text>
        </VStack>
        <IconButton
          icon={<Icon as={MaterialIcons} name="more-vert" size="sm" />}
          variant="ghost"
          onPress={() => {/* Show options */}}
        />
      </HStack>
    </Pressable>
  );

  const renderContent = () => {
    if (loading && !isRefreshing) {
      return (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" color="blue.500" />
          <Text mt={4} color="gray.500">Loading your list...</Text>
        </Box>
      );
    }

    if (error) {
      return (
        <Box flex={1} justifyContent="center" alignItems="center" p={4}>
          <Icon 
            as={MaterialIcons} 
            name="error-outline" 
            size="4xl" 
            color="red.500" 
          />
          <Text mt={4} textAlign="center" color="gray.500">
            {error}
          </Text>
          <Pressable
            mt={4}
            bg="blue.500"
            px={6}
            py={2}
            rounded="full"
            onPress={loadData}
          >
            <Text color="white">Try Again</Text>
          </Pressable>
        </Box>
      );
    }

    const currentList = activeTab === 'toWatch' ? toWatch : watched;

    if (currentList.length === 0) {
      return (
        <Box flex={1} justifyContent="center" alignItems="center" p={4}>
          <Icon 
            as={MaterialIcons} 
            name={activeTab === 'toWatch' ? 'playlist-add' : 'playlist-play'} 
            size="4xl" 
            color="gray.300" 
          />
          <Text mt={4} color="gray.400" textAlign="center">
            {activeTab === 'toWatch'
              ? "No movies in your watch list yet"
              : "No watched movies yet"
            }
          </Text>
        </Box>
      );
    }

    return (
      <FlatList
        data={currentList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.movieId.toString()}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <Box p={4} bg="white">
        <Text fontSize="2xl" fontWeight="bold">My List</Text>
      </Box>

      <HStack bg="white" mb={2}>
        <TabButton
          title="To Watch"
          isActive={activeTab === 'toWatch'}
          onPress={() => setActiveTab('toWatch')}
        />
        <TabButton
          title="Watched"
          isActive={activeTab === 'watched'}
          onPress={() => setActiveTab('watched')}
        />
      </HStack>

      {renderContent()}
    </Box>
  );
};

export default MyListScreen;