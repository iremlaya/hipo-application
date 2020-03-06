import {combineReducers} from 'redux';
import {ADD_POSITIONS, ADD_PERIOD, ADD_FIRST_PART} from '../../assets/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  cv: '',
  notes: '',
  period: {
    id: 0,
    name: '',
    positions: [
      {
        id: 0,
        name: '',
      },
    ],
    start_date: '',
    end_date: '',
    last_application_date: '',
    location: '',
  },
  positions: [],
};

const formReducer = (state = INITIAL_STATE, action) => {
  const newForm = action.payload;

  switch (action.type) {
    case ADD_FIRST_PART:
      return {
        ...state,
        ...newForm,
      };
    case ADD_PERIOD:
      return {
        ...state,
        period: newForm,
      };
    case ADD_POSITIONS:
      return {
        ...state,
        positions: newForm,
      };
    default:
      return state;
  }
};

export default combineReducers({
  form: formReducer,
});
