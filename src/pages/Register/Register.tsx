import styles from './Register.module.css';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './Register.state';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import {
  Actions,
  RegisterFormState,
  RegisterFormValues,
} from './Register.types';

function Register() {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

  const { isValid, values } = formState;

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (!isValid.email || !isValid.password || !isValid.name) {
      focusOnError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: Actions.RESET_VALIDITY });
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (registerErrorMessage) {
      dispatchForm({ type: Actions.SET_ERROR, payload: registerErrorMessage });
    }
  }, [registerErrorMessage]);

  const focusOnError = (isValid: RegisterFormState['isValid']) => {
    switch (true) {
      case !isValid.email:
        emailRef.current?.focus();
        break;
      case !isValid.password:
        passwordRef.current?.focus();
        break;
      case !isValid.name:
        nameRef.current?.focus();
        break;
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: Actions.SET_VALUE,
      payload: { [e.target.name]: e.target.value } as RegisterFormValues,
    });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());

    const isEmailValid = Boolean(values.email.trim());
    const isPasswordValid = Boolean(values.password.trim());
    const isNameValid = Boolean(values.name.length);

    dispatchForm({
      type: Actions.SUBMIT,
      payload: {
        email: isEmailValid,
        password: isPasswordValid,
        name: isNameValid,
      },
    });

    const { email, password, name } = values;
    if (isEmailValid && isPasswordValid && isNameValid) {
      dispatch(register({ email, password, name }));
    }
  };

  return (
    <div className={styles['login']}>
      <Heading>Регистрация</Heading>
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email</label>
          <Input
            ref={emailRef}
            id="email"
            placeholder="Email"
            name="email"
            isValid={isValid.email}
            onChange={onChange}
            value={values.email}
          ></Input>
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            ref={passwordRef}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            isValid={isValid.password}
            autoComplete="section-blue current-password"
            value={values.password}
            onChange={onChange}
          ></Input>
        </div>
        <div className={styles['field']}>
          <label htmlFor="name">Ваше имя</label>
          <Input
            ref={nameRef}
            id="name"
            placeholder="Name"
            name="name"
            isValid={isValid.name}
            onChange={onChange}
            value={values.name}
          ></Input>
        </div>
        <Button appearence="big" className={styles['submit-button']}>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles['links']}>
        <div>Уже есть аккаунт?</div>
        <div>
          <Link to="/auth/login">Вход</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
