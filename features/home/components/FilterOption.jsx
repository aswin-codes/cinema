// src/components/Options.jsx
import React from 'react';
import { Text } from 'react-native';
import { HStack, Pressable, IconButton } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOption, sortMovies } from '../../../redux/movieSlice';

const Options = ({ onFilterPress }) => {
    const dispatch = useDispatch();
    const filterOption = useSelector(state => state.movies.filterOption);

    const handleSort = () => {
        dispatch(sortMovies());
    };

    return (
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Pressable onPress={onFilterPress}>
                <HStack space={2} alignItems="center">
                    <MaterialIcons
                        name="filter-list"
                        size={24}
                        color="black"
                    />
                    <Text>
                        {filterOption === 'all' ? 'All' : filterOption.toUpperCase()}
                    </Text>
                </HStack>
            </Pressable>

            <Pressable onPress={handleSort}>
                <HStack space={2} alignItems="center">
                    <MaterialIcons
                        name="sort"
                        size={24}
                        color="black"
                    />
                    <Text>Sort</Text>
                </HStack>
            </Pressable>
        </HStack>
    );
};

export default Options;