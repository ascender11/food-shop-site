import { Reducer } from 'react';
import { Actions, ActionsType, RegisterFormState } from './Register.types';

export const INITIAL_STATE: RegisterFormState = {
  isValid: {
    email: true,
    password: true,
    name: true,
  },
  errorMessage: '',
  values: {
    email: '',
    password: '',
    name: '',
  },
};

export const formReducer: Reducer<RegisterFormState, ActionsType> = (
  state,
  action
) => {
  switch (action.type) {
    case Actions.SET_VALUE:
      return { ...state, values: { ...state.values, ...action.payload } };

    case Actions.RESET_VALIDITY:
      return { ...state, isValid: { ...INITIAL_STATE.isValid } };

    case Actions.SUBMIT: {
      return {
        ...state,
        isValid: { ...state.isValid, ...action.payload },
      };
    }

    case Actions.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      throw new Error('Invalid action type');
  }
};
