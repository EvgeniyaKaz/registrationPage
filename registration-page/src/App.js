import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.css";

const initialState = {
	email: "",
	password: "",
	repeatPassword: "",
};

const scheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w_.@]*$/,
			"Неверный email. Допустимые символы: английские буквы, цифры, точка и нижнее подчеркивание."
		)
		.max(
			20,
			"Неверный email. Длина email должна быть не больше 20 символов."
		)
		.min(
			2,
			"Неверный email. Длина email должна быть не меньше 2 символов."
		),
	password: yup
		.string()
		.matches(
			/^[\w]*$/,
			"Неверный пароль. Допустимые символы: цифры и английские буквы."
		)
		.max(
			20,
			"Неверный пароль. Длина пароля должна быть не больше 20 символов."
		)
		.min(
			5,
			"Неверный пароль. Длина пароля должна быть не менее 5 символов."
		),
	repeatPassword: yup
		.string()
		.matches(
			/^[\w]*$/,
			"Неверный пароль. Допустимые символы: цифры и английские буквы."
		)
		.oneOf([yup.ref("password")], "Пароли не совпадают")
		.max(
			20,
			"Неверный пароль. Длина пароля должна быть не больше 20 символов."
		)
		.min(
			5,
			"Неверный пароль. Длина пароля должна быть не менее 5 символов."
		),
});

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialState,
		resolver: yupResolver(scheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPassword = errors.repeatPassword?.message;

	const sendData = (formData) => {
		console.log(formData);
	};

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
					name="email"
					placeholder="Введите email"
					className={styles["container-form-input"]}
					{...register("email")}
				/>
				<br />
				<input
					type="password"
					name="password"
					placeholder="Введите пароль"
					className={styles["container-form-input"]}
					{...register("password")}
				/>
				<br />
				<input
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					className={styles["container-form-input"]}
					{...register("repeatPassword")}
				/>
				<br />
				<button
					type="submit"
					className={
						!!emailError || !!passwordError || !!repeatPassword
							? styles["container-form-button-block"]
							: styles["container-form-button"]
					}
					disabled={
						!!emailError || !!passwordError || !!repeatPassword
					}
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
