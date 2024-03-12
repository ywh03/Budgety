import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import ColorPicker, { Panel1, Swatches, OpacitySlider, HueSlider, colorKit, PreviewText } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';

export default function ColorPalette(props: { defaultColor: string, handleHexColor: ( hex: string ) => void }) {
  const [showModal, setShowModal] = useState(false);

  const confirmedColor = useSharedValue(props.defaultColor);
  const selectedColor = useSharedValue(props.defaultColor);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const onColorSelect = (color: returnedResults) => {
    'worklet';
    selectedColor.value = color.hex;
  };

  const dynamicOpenButtonStyles = useAnimatedStyle(() => {
    return {
        backgroundColor: confirmedColor.value,
    }
  })

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Animated.View style={[styles.openButton, dynamicOpenButtonStyles]}>
            <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
        </Animated.View>
      </Pressable>

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={24}
              thumbShape='circle'
              onChange={onColorSelect}
              boundedThumb
            >
              <Panel1 style={styles.panelStyle} />
              <HueSlider style={styles.sliderStyle} />
              <OpacitySlider style={styles.sliderStyle} />
              <View style={styles.previewTxtContainer}>
                <PreviewText style={{ color: '#707070' }} />
              </View>
            </ColorPicker>
          </View>

          <Pressable style={styles.submitButton} onPress={() => {
            setShowModal(false);
            props.handleHexColor(selectedColor.value);
            confirmedColor.value = selectedColor.value;
          }}>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Submit</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={() => {
            setShowModal(false)
            selectedColor.value = confirmedColor.value;
            }}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: 250,
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 100,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  submitButton: {
    position: 'absolute',
    bottom: 150,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});