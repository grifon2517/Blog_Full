import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';

import { useState } from 'react';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants/constants/prop-type';
import { request } from '../../../../utils/request';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;
	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
				</div>
				<div className="save-role-button">
					<Icon
						id="fa-floppy-o"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>

			<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	// border: 1px solid #000;
	margin-top: 10px;

	& select {
		padding: 0 5px;
		font-size: 16px;
	}

	& .save-role-button {
		width: 21;
		height: 32px;
		margin: 0 10px 0 20px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
