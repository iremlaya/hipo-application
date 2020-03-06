import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';

import PeriodItem from './PeriodItem';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPeriod} from '../store/actions/formActions';

const Periods = props => {
  /*
    var dict= {
      1: ''
    }
    */
  const [periods, setPeriods] = useState([]);
  useEffect(() => {
    fetch('https://hipolabs.com/api/internship-periods/')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setPeriods(myJson);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleChildClick(navigateTo, childData, event) {
    props.addPeriod(childData);
    navigateTo.navigate('Positions');
  }

  return (
    <FlatList
      data={periods}
      renderItem={({item}) => (
        <PeriodItem
          title={item.name}
          onClick={e => handleChildClick(props.navigation, item, e)}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.periodContainer}
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
      addPeriod,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Periods);

const styles = StyleSheet.create({
  periodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
});
