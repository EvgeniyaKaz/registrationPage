import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { scheme } from "./form-scheme";
import styles from "./App.module.css";

const initialState = {
	email: "",
	password: "",
	repeatPassword: "",
};

function App() {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { isValid, errors, touchedFields },
	} = useForm({
		defaultValues: initialState,
		resolver: yupResolver(scheme),
		mode: "onTouched",
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPassword = errors.repeatPassword?.message;

	const sendData = ({ email, password }) => {
		console.log({ email, password });
	};

	const submitButtonRef = useRef(null);
	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className={styles.container}>
			<form
				className={styles["container-form"]}
				onSubmit={handleSubmit(sendData)}
			>
				<header className={styles["container-form-header"]}>
					Регистрация
				</header>
				<input
					type="email"
					placeholder="Введите email"
					className={styles["container-form-input"]}
					{...register("email")}
				/>
				<br />
				<input
					type="password"
					placeholder="Введите пароль"
					className={styles["container-form-input"]}
					{...register("password", {
						onChange: () =>
							touchedFields.repeatPassword &&
							trigger("repeatPassword"),
					})}
				/>
				<br />
				<input
					type="password"
					placeholder="Повторите пароль"
					className={styles["container-form-input"]}
					{...register("repeatPassword")}
				/>
				<br />
				<button
					type="submit"
					className={
						!isValid
							? styles["container-form-button-block"]
							: styles["container-form-button"]
					}
					disabled={!isValid}
					ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
				<p className={styles["error-login"]}>
					{emailError}
					{passwordError}
					{repeatPassword}
				</p>
			</form>
		</div>
	);
}

export default App;
