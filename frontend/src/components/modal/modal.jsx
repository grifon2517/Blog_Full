import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';

import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	/* --- ОСНОВНОЙ КОНТЕЙНЕР (НА ВЕСЬ ЭКРАН) --- */
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 30;

	/* Делаем его flex-контейнером, чтобы легко центрировать дочерний .box */
	display: flex;
	justify-content: center; /* Центрируем по горизонтали */
	align-items: center; /* Центрируем по вертикали */

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	/* --- САМО МОДАЛЬНОЕ ОКНО (.box) --- */
	& .box {
		position: relative; /* Чтобы z-index сработал и окно было НАД оверлеем */
		z-index: 31;

		/* Внутреннее расположение: вертикальная колонка */
		display: flex;
		flex-direction: column;
		gap: 20px; /* Пространство между текстом и блоком с кнопками */

		width: 400px;
		padding: 20px; /* Добавил отступ сверху для красоты */
		background-color: #fff;
		border: 3px solid #000;
		border-radius: 8px; /* Небольшое скругление углов */

		text-align: center; /* <-- Исправлена опечатка */
	}

	/* --- КОНТЕЙНЕР ДЛЯ КНОПОК --- */
	& .buttons {
		display: flex;
		justify-content: center; /* Центрирует кнопки по горизонтали */
		gap: 15px; /* Добавляет красивый отступ между кнопками */
	}
`;
