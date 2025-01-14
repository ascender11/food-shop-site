import styles from './Login.module.css';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './Login.state.ts';
import {
  Actions,
  LoginFormReducer,
  LoginFormValues,
  LoginFormState,
} from './Login.types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { login, userActions } from '../../store/user.slice.ts';

function Login() {
  const [formState, dispatchForm] = useReducer<LoginFormReducer>(
    formReducer,
    INITIAL_STATE
  );
  const { isValid, values } = formState;

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (!isValid.email || !isValid.password) {
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
    if (loginErrorMessage) {
      dispatchForm({ type: Actions.SET_ERROR, payload: loginErrorMessage });
    }
  }, [loginErrorMessage]);

  const focusOnError = (isValid: LoginFormState['isValid']) => {
    switch (true) {
      case !isValid.email:
        emailRef.current?.focus();
        break;
      case !isValid.password:
        passwordRef.current?.focus();
        break;
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());

    const isEmailValid = Boolean(values.email.trim());
    const isPasswordValid = Boolean(values.password.trim());

    dispatchForm({
      type: Actions.SUBMIT,
      payload: { email: isEmailValid, password: isPasswordValid },
    });

    const { email, password } = values;
    if (isEmailValid && isPasswordValid) {
      dispatch(login({ email, password }));
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: Actions.SET_VALUE,
      payload: { [e.target.name]: e.target.value } as LoginFormValues,
    });
  };

  return (
    <div className={styles['login']}>
      <Heading>Вход</Heading>
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email</label>
          <Input
            ref={emailRef}
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            isValid={isValid.email}
            onChange={onChange}
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
            onChange={onChange}
          ></Input>
        </div>
        <Button appearence="big" className={styles['submit-button']}>
          Вход
        </Button>
      </form>
      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <div>
          <Link to="/auth/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
