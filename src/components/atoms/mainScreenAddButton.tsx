import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated ,Image } from 'react-native';
import imagePath from '../../constants/imagePath';

let arr = [];
arr[1] = require('@/src/assets/images/income.png');
arr[2] = require('@/src/assets/images/expense.png');

    

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [animations, setAnimations] = useState(
    Array.from({ length: 2 }, () => new Animated.Value(0)) 
  );


  const toggleMenu = () => {

    setIsOpen(!isOpen);

    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: isOpen ? 0 : 1,
        duration: (index + 1) * 200, 
        useNativeDriver: true,
      }).start();
    });
  };

  const getTransform = (index) => {
    const angle = Math.PI / 2.5 + (index * Math.PI) / 4; 
    const radius = 100; 

    return {
      translateX: animations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, radius * Math.cos(angle)],
      }),
      translateY: animations[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, -radius * Math.abs(Math.sin(angle))], 
      }),
    };
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.circle, isOpen && styles.activeCircle]}
        onPress={toggleMenu}
      >
        <Text style={styles.icon}>{isOpen ? '×' : '+'}</Text>
      </TouchableOpacity>

      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.subCircle,
            {
              transform: [
                { translateX: getTransform(index).translateX },
                { translateY: getTransform(index).translateY },
              ],
              opacity: anim,
            },
          ]}
        >
          <TouchableOpacity style={styles.subButton} activeOpacity={0.7} >
          <Image source={arr[index + 1]} style={{ width: 38, height: 28, marginBottom:2}} />
    
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  circle: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  activeCircle: {
    backgroundColor: '#000',
  },
  icon: {
    fontSize: 44,
    color: '#fff',
    marginBottom:2
  },
  subCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#1b1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  subButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FloatingMenu;
