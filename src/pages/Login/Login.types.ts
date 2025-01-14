import { Reducer } from 'react';

export type LoginFormValues = {
  email: string;
  password: string;
};

export interface IFormState<FormValues extends Record<string, unknown>> {
  isValid: Record<keyof FormValues, boolean>;
  errorMessage: string;
  values: FormValues;
}

export type LoginFormState = IFormState<LoginFormValues>;

export enum Actions {
  SET_VALUE,
  SUBMIT,
  RESET_VALIDITY,
  SET_ERROR,
}

export interface IActionSetValue<FormValue> {
  type: Actions.SET_VALUE;
  payload: FormValue;
}

export interface IActionSubmit {
  type: Actions.SUBMIT;
  payload: LoginFormState['isValid'];
}

export interface IActionResetValidity {
  type: Actions.RESET_VALIDITY;
}

export interface IActionSetError {
  type: Actions.SET_ERROR;
  payload: string;
}

export type ActionsType =
  | IActionSetValue<LoginFormValues>
  | IActionSubmit
  | IActionResetValidity
  | IActionSetError;

export type LoginFormReducer = Reducer<LoginFormState, ActionsType>;
