import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {connect} from 'react-redux';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const Overview = props => {
  
  const propsToQuery = () => {
    return gql`
      {
        listInternshipPositions {
          id
          name
        }
      }
    `;
  };
  const submitAll = () => {
    var tempProps = {...props};
    tempProps.form.period = props.form.period.id;
    for (let index = 0; index < tempProps.form.positions.length; index++) {
      tempProps.form.positions[index] = tempProps.form.positions[index].id;
    }
    console.log(props.form);
  };
  return (
    <View style={styles.container}>
      <>
        {Object.keys(props.form).map(entry => {
          return (
            <>
              <Text style={styles.textName}>{entry}:</Text>
              <Text style={styles.text}>
                {JSON.stringify(props.form[entry])}
              </Text>
            </>
          );
        })}
      </>
      <TouchableHighlight style={styles.submit} onPress={submitAll}>
        <Text style={styles.submitText}> S U B M I T </Text>
      </TouchableHighlight>
    </View>
  );
};

const mapStateToProps = state => {
  const {form} = state;
  return {form};
};

export default connect(mapStateToProps)(Overview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
  },
  textName: {
    color: 'rgb(79, 98, 148)',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 20,
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlignVertical: 'center',
  },

  submit: {
    borderRadius: 8,
    backgroundColor: 'rgba(79, 98, 148,0.5)',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 100,
    marginRight: 20,
    height: 40,
    width: 100,
    justifyContent: 'center',
  },
});
