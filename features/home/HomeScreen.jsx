import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text, TextInput, Alert, RefreshControl } from 'react-native';
import { Box, HStack, IconButton, Icon, Modal, VStack, Pressable, CircularProgress } from 'native-base';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setSearchQuery, setFilterOption, sortMovies } from '../../redux/movieSlice';
import { Circle } from 'react-native-progress';
import AppBar from './components/AppBar';
import SearchBar from './components/SearchBar';
import Options from './components/FilterOption';
import FilterModal from './components/FilterModal';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const {
        filteredMovies,
        searchQuery,
        filterOption,
        loading,
        error
    } = useSelector(state => state.movies);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
    };

    const handleFilterOptionSelect = (option) => {
        dispatch(setFilterOption(option));
        setShowFilterModal(false);
    };

    const handleSort = () => {
        dispatch(sortMovies());
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchMovies()).then(() => {
            setRefreshing(false);
        });
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
        >
            <Image source={{ uri: item.poster_url }} style={styles.poster} />
            <View style={[styles.info, { flex: 1 }]}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                    {item.title}
                </Text>
                <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                    {item.Description}
                </Text>
                <Text style={styles.type}>{item.type.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Box flex={1} padding={4}>
            <AppBar />
            <SearchBar />

            <Options onFilterPress={() => setShowFilterModal(true)} />

            <FilterModal 
                isOpen={showFilterModal} 
                onClose={() => setShowFilterModal(false)}
            />

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <Circle />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredMovies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#000']} // Android
                            tintColor="#000" // iOS
                        />
                    }
                />
            )}
        </Box>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    searchBox: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    info: {
        marginLeft: 10,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    type: {
        color: '#666',
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;