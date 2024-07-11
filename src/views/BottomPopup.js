import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomPopup = ({ isVisible, onClose, item }) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: item ? item.url : '' }}
          style={styles.backgroundContainer}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.iconContainer}>
            <Text style={styles.title}>{item ? item.place : ''}</Text>
            <TouchableOpacity style={styles.icon} onPress={onClose}>
              <Icon name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>現時氣溫</Text>
            <View style={styles.rightInfo}>
              <Text style={styles.valueText}>{item ? item.value : ''}</Text>
              <Text style={styles.unitText}>{`\u00B0${item ? item.unit : ''}`}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>降雨機率</Text>
            <View style={styles.rightInfo}>
              <Text style={styles.valueText}>50</Text>
              <Text style={styles.unitText}>%</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#d8e9ee',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  backgroundContainer: {
    padding: 25,
  },
  backgroundImage: {
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    opacity: 0.9,
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
    alignItems: 'center',
  },
  leftText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  rightInfo: {
    flexDirection: 'row',
  },
  valueText: {
    fontSize: 50,
    color: 'black',
  },
  unitText: {
    fontSize: 30,
    color: 'black',
  },
  iconContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
});

export default BottomPopup;
