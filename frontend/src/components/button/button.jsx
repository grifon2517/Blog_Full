import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	color: #000;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #b1aeae;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}

	/* --- ЯВНЫЕ СТИЛИ ДЛЯ НЕАКТИВНОГО СОСТОЯНИЯ --- */
    &:disabled {
        /* 1. Задаем "неактивные" цвета */
        color: #a9a9a9;             /* Светло-серый текст */
        background-color: #e9e9e9;  /* Серый фон */
        border-color: #d3d3d3;      /* Серая рамка (чтобы кнопка не "урезалась") */

`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
