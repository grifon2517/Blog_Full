import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { selectUserRole } from '../../../../selectors';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../action';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils/check-access';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && <Icon inactive={true} id="fa-calendar-o" margin="0 10px 0 0" />}
				{publishedAt}
			</div>

			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							margin="-1.5px 10px 0 0"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
