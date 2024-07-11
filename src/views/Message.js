import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ msg }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{msg}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Message;
