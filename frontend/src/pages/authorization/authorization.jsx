import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Navigate } from 'react-router-dom';

import { AuthFormError, Button, Input, H2 } from '../../components';
import { useState } from 'react';
import { useResetForm } from '../../hooks';
import styled from 'styled-components';
import { setUser } from '../../action';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { request } from '../../utils/request';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максиумум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки: № %')

		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(20, 'Неверно заполнен пароль. Максиумум 20 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<H2>Авторизация</H2>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
