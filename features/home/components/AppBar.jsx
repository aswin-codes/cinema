import { Text, Alert, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HStack, IconButton, Icon } from 'native-base';

const AppBar = () => {
    const handlePress = () => {
        Alert.alert(
            "Under Development",
            "This feature is currently under development.",
            [{ text: "OK", onPress: () => console.log("Alert closed") }]
        );
    };

    return (
        <HStack justifyContent="space-between" alignItems="center" my={4}>
            <IconButton
                icon={<Icon as={Ionicons} name="menu" size="md" />}
                onPress={handlePress}
            />
            <Text style={styles.header}>Cinemas</Text>
            <IconButton
                icon={<Icon as={Ionicons} name="person" size="md" />}
                onPress={handlePress}
            />
        </HStack>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
})

export default AppBar;
