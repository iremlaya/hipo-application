import {ADD_POSITIONS, ADD_PERIOD, ADD_FIRST_PART} from '../../assets/types';

export const addFirstPart = object => ({
  type: ADD_FIRST_PART,
  payload: object,
});

export const addPeriod = period => ({
  type: ADD_PERIOD,
  payload: period,
});

export const addPositions = positions => ({
  type: ADD_POSITIONS,
  payload: positions,
});
