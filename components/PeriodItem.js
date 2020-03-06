import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const PeriodItem = props => {
  return (
    <TouchableHighlight style={styles.submitPeriod} onPress={props.onClick}>
      <Text style={styles.submitPeriodText}> {props.title} </Text>
    </TouchableHighlight>
  );
};

export default PeriodItem;

const styles = StyleSheet.create({
  submitPeriodText: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlignVertical: 'center',
  },

  submitPeriod: {
    borderRadius: 8,
    backgroundColor: 'rgba(79, 98, 148,0.5)',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 20,
    height: 70,
    width: 200,
    justifyContent: 'center',
  },
});
