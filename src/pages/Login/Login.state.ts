import { Reducer } from 'react';
import { Actions, ActionsType, LoginFormState } from './Login.types';

export const INITIAL_STATE: LoginFormState = {
  isValid: {
    email: true,
    password: true,
  },
  errorMessage: '',
  values: {
    email: '',
    password: '',
  },
};

export const formReducer: Reducer<LoginFormState, ActionsType> = (
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
