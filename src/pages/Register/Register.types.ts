import { Reducer } from 'react';

export type RegisterFormValues = {
  email: string;
  password: string;
  name: string;
};

export interface IFormState<FormValues extends Record<string, unknown>> {
  isValid: Record<keyof FormValues, boolean>;
  errorMessage: string;
  values: FormValues;
}

export type RegisterFormState = IFormState<RegisterFormValues>;

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
  payload: RegisterFormState['isValid'];
}

export interface IActionResetValidity {
  type: Actions.RESET_VALIDITY;
}

export interface IActionSetError {
  type: Actions.SET_ERROR;
  payload: string;
}

export type ActionsType =
  | IActionSetValue<RegisterFormValues>
  | IActionSubmit
  | IActionResetValidity
  | IActionSetError;

export type RegisterFormReducer = Reducer<RegisterFormState, ActionsType>;
