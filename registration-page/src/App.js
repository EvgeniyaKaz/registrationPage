import styles from "./App.module.css";
import { useState, useRef } from "react";

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
};

const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
  };
};

function App() {
  const { getState, updateState } = useStore();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const submitButtonRef = useRef(null);

  const sendData = (event) => {
    event.preventDefault();
    console.log(getState());
  };

  console.log(getState());

  const { email, password, repeatPassword } = getState();

  const onChangeEmail = ({ target }) => {
    updateState(target.name, target.value);
    if (!/^[\w_.@]*$/.test(target.value)) {
      setEmailError(
        "Неверный email. Допустимые символы: английские буквы, цифры, точка и нижнее подчеркивание."
      );
    } else if (target.value.length > 20) {
      setEmailError(
        "Неверный email. Длина email должна быть не больше 20 символов."
      );
    } else {
      setEmailError(null);
    }
  };

  const onBlurEmail = ({ target }) => {
    if (target.value.length < 2) {
      setEmailError(
        "Неверный email. Длина email должна быть не меньше 2 символов."
      );
    } else {
      setEmailError(null);
    }
  };

  const onChangePassword = ({ target }) => {
    updateState(target.name, target.value);
    if (!/^[\w]*$/.test(target.value)) {
      setPasswordError(
        "Неверный пароль. Допустимые символы: цифры и английские буквы."
      );
    } else if (target.value.length > 20) {
      setPasswordError(
        "Неверный пароль. Длина пароля должна быть не больше 20 символов."
      );
    } else {
      setPasswordError(null);
    }
  };

  const onBlurPassword = ({ target }) => {
    if (target.value.length < 5) {
      setPasswordError(
        "Неверный пароль. Длина пароля должна быть не менее 5 символов."
      );
    } else {
      setPasswordError(null);
    }
  };

  const onBlurRepeatPassword = ({ target }) => {
    if (target.value.length < 5) {
      setPasswordError(
        "Неверный пароль. Длина пароля должна быть не менее 5 символов."
      );
    } else if (repeatPassword !== password) {
      setPasswordError("Пароли несовпадают.");
    } else {
      setPasswordError(null);
    }
  };

  const blockButton = () => {
    if (
      emailError !== null ||
      passwordError !== null ||
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      repeatPassword !== password
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles["container-form"]} onSubmit={sendData}>
        <header className={styles["container-form-header"]}>Регистрация</header>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Введите email"
          className={styles["container-form-input"]}
          onChange={onChangeEmail}
          onBlur={onBlurEmail}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Введите пароль"
          className={styles["container-form-input"]}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
        />
        <br />
        <input
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          placeholder="Повторите пароль"
          className={styles["container-form-input"]}
          onChange={onChangePassword}
          onBlur={onBlurRepeatPassword}
        />
        <br />
        <button
          ref={submitButtonRef}
          type="submit"
          className={styles["container-form-buttonn"]}
          disabled={blockButton()}
        >
          Зарегистрироваться
        </button>
        <p className={styles["error-login"]}>
          {emailError}
          {passwordError}
        </p>
      </form>
    </div>
  );
}

export default App;
