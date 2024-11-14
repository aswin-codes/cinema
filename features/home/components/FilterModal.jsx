// src/components/FilterModal.jsx
import React from 'react';
import { Text } from 'react-native';
import { Modal, VStack, Pressable } from 'native-base';
import { useDispatch } from 'react-redux';
import { setFilterOption } from '../../../redux/movieSlice';

const FilterModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const handleFilterSelect = (option) => {
        dispatch(setFilterOption(option));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content maxWidth="400px">
                <Modal.Header>Filter</Modal.Header>
                <Modal.Body>
                    <VStack space={4}>
                        <Pressable onPress={() => handleFilterSelect('all')}>
                            <Text>All</Text>
                        </Pressable>
                        <Pressable onPress={() => handleFilterSelect('movie')}>
                            <Text>Movies</Text>
                        </Pressable>
                        <Pressable onPress={() => handleFilterSelect('show')}>
                            <Text>Shows</Text>
                        </Pressable>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
};

export default FilterModal;