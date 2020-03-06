/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import _ from 'lodash';

import {SelectMultipleButton} from 'react-native-selectmultiple-button';
const PositionItem = props => {
  const [multipleSelectedData, setMultipleSelectedData] = useState([]);

  function singleTapMultipleSelectedButtons(interest) {
    const temp = [...multipleSelectedData];
    if (temp.includes(interest)) {
      _.remove(temp, ele => {
        return ele === interest;
      });
    } else {
      temp.push(interest);
    }
    setMultipleSelectedData(temp);
  }

  const onSubmit = () => {
    console.log(multipleSelectedData);
    props.addPositions(multipleSelectedData);
    props.navigateTo.navigate('Overview');
  };

  const displayText = () => {
    if (multipleSelectedData.length === 0) {
      return 'Start choosing from available positions';
    } else {
      return `I choose ${_.join(multipleSelectedData.map(e => e.name), ', ')}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.positionText}>{displayText()}</Text>
      <View>
        {props.data.map(interest => (
          <SelectMultipleButton
            key={interest.id}
            buttonViewStyle={styles.positionButton}
            textStyle={styles.positionText}
            highLightStyle={{
              borderColor: 'gray',
              backgroundColor: 'transparent',
              textColor: 'gray',
              borderTintColor: 'rgba(79, 98, 148,0.8)',
              backgroundTintColor: 'rgba(79, 98, 148,0.1)',
              textTintColor: 'black',
            }}
            value={interest.name}
            selected={multipleSelectedData.includes(interest)}
            singleTap={valueTap => singleTapMultipleSelectedButtons(interest)}
          />
        ))}
      </View>
      <TouchableHighlight style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitText}> N E X T</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PositionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
  positionText: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlignVertical: 'center',
  },

  positionButton: {
    borderRadius: 8,
    backgroundColor: 'rgba(79, 98, 148,0.5)',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 20,
    height: 70,
    width: 200,
    justifyContent: 'center',
  },
  submitButton: {
    borderRadius: 8,
    backgroundColor: 'rgba(79, 98, 148,0.5)',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    height: 40,
    width: 100,
    marginTop: 20,
    marginRight: 15,
    justifyContent: 'center',
  },
  submitText: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
