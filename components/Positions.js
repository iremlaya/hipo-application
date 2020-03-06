import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PositionItem from './PositionItem';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPositions} from '../store/actions/formActions';

const Positions = props => {
  /*
    const [form, setForm] = useState({
      name: '',
      email: '',
      cv: '',
      notes: '',
      period: '',
      positions: [],
    });
    useEffect(() => {
      console.log('00');
      const updateState = async () => {
        let values = {};
        try {
          const saved = await AsyncStorage.getItem(KEY);
          values = JSON.parse(saved || '{}');
          console.log(values);
          setForm({
            name: values.name,
            email: values.email,
            cv: values.cv,
            notes: values.notes,
          });
          return values;
        } catch (e) {
          console.warn(e);
          return {};
        }
      };
      updateState();
    }, []);
    */
  var p_Data = props.form.period.positions;
  return (
    <PositionItem
      data={p_Data}
      navigateTo={props.navigation}
      addPositions={props.addPositions}
    />
  );
};

const mapStateToProps = state => {
  const {form} = state;
  return {form};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addPositions,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Positions);

const styles = StyleSheet.create({
  periodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
});
