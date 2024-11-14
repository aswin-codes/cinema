// src/components/SearchBar.jsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../../redux/movieSlice';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.movies.searchQuery);

    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
    };

    return (
        <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search movies/shows..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
                <MaterialIcons
                    name="close"
                    size={24}
                    color="#666"
                    style={styles.clearIcon}
                    onPress={() => handleSearch('')}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    clearIcon: {
        marginLeft: 8,
        padding: 4,
    },
});

export default SearchBar;