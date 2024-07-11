import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Cell = ({ item, showBottomPopup }) => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => showBottomPopup(item)}>
                <ImageBackground
                    source={{ uri: item.url }}
                    style={styles.backgroundContainer}
                    imageStyle={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.leftText}>{!item.nearest ? item.place : '我的位置'}</Text>
                            {item.nearest ? (
                                <Text style={styles.currectLocationText}>{item.place}</Text>
                            ) : null}
                        </View>
                        <View style={styles.rightInfo}>
                            <Text style={styles.valueText}>{item.value}</Text>
                            <Text style={styles.unitText}>{`\u00B0${item.unit}`}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        overflow: 'hidden',
        marginVertical: 8,
        borderRadius: 10,
    },
    backgroundContainer: {
        padding: 20,
    },
    backgroundImage: {
        opacity: 0.75,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    currectLocationText: {
        fontSize: 14,
        color: 'white',
    },
    rightInfo: {
        flexDirection: 'row',
    },
    valueText: {
        fontSize: 50,
        color: 'white',
    },
    unitText: {
        fontSize: 30,
        color: 'white',
    },
});

export default Cell;