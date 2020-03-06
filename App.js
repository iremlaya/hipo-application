import React from 'react';

import Positions from './components/Positions';
import Periods from './components/Periods';
import SubmitForm from './components/SubmitForm';
import Overview from './components/Overview';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import formReducer from './store/reducers/formReducer';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Home: SubmitForm,
    Positions: Positions,
    Periods: Periods,
    Overview: Overview,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);
const store = createStore(
  formReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
