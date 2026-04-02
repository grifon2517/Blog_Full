import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperture, setTemperture] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Orenburg&units=metric&lang=ru&appid=95aa6bb7b3ee9fbc18bbfe6cce1251af',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperture(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>webdev@dat.com</div>
			</div>
			<div>
				<div>
					{' '}
					{city},{' '}
					{new Date().toLocaleDateString('ru', {
						day: 'numeric',
						month: 'long',
					})}
				</div>
				<div>
					Температура: {temperture} градусов и сейчас: {weather}{' '}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 2px 17px #000;
	background-color: #fff;
	font-weight: bold;
`;
