import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';

import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNFS from 'react-native-fs';
import RNFileSelector from 'react-native-file-selector';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFirstPart} from '../store/actions/formActions';

const SubmitForm = props => {
  const [cv, setCv] = useState('');
  const [cvName, setCvName] = useState('');

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'This app needs access to your storage ' +
            'so you can upload your cv.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const handleCvUpload = async () => {
    await requestStoragePermission();
    return RNFileSelector.Show({
      title: 'Select File',
      onDone: path => {
        var name = path.substring(path.lastIndexOf('/') + 1);
        setCvName(name);
        RNFS.readFile(path, 'base64')
          .then(contents => {
            console.log(contents);
            setCv(contents);
            return contents;
          })
          .catch(err => {
            console.log(err.message, err.code);
          });
        console.log(cv);
      },
      onCancel: () => {
        console.log('cancelled');
      },
    });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Text> {props.form.name}</Text>
        <Formik
          initialValues={{name: '', email: '', notes: ''}}
          onSubmit={values => {
            values.cv = cv;
            props.addFirstPart(values);
            props.navigation.navigate('Periods');
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formik} behavior="height" enabled>
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Text style={styles.text}>Email</Text>
              <Text
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Text style={styles.text}>CV</Text>
              <Text style={styles.input}>{cvName}</Text>
              <TouchableHighlight
                style={styles.uploadButton}
                onPress={handleCvUpload}>
                <Text style={styles.uploadText}>upload pdf</Text>
              </TouchableHighlight>
              <Text style={styles.text}>Notes</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('notes')}
                onBlur={handleBlur('notes')}
                value={values.notes}
              />
              <TouchableHighlight style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitText}> N E X T</Text>
              </TouchableHighlight>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {form} = state;
  return {form};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addFirstPart,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  formik: {
    alignSelf: 'center',
    marginTop: 50,
  },
  input: {
    borderRadius: 5,
    width: 280,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 15,
    height: 40,
  },
  text: {
    color: 'rgb(79, 98, 148)',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 20,
  },
  submit: {
    borderRadius: 8,
    backgroundColor: 'rgba(79, 98, 148,0.5)',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 40,
    width: 100,
    marginTop: 15,
    justifyContent: 'center',
  },
  submitText: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  uploadButton: {
    borderRadius: 8,
    backgroundColor: 'rgba(79, 98, 148,0.3)',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 5,
    height: 30,
    width: 70,
    justifyContent: 'center',
  },
  uploadText: {
    alignSelf: 'center',
    fontSize: 12,
  },
});
