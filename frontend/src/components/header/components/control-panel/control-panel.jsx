import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../constants';
import { selectUserRole, selectUserLogin } from '../../../../selectors';
import { logout } from '../../../../action/logout';
import { checkAccess } from '../../../../utils/check-access';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 0 0 0 0;
	height: 32px;
`;

const StyledLogoutIcon = styled.div`
	margin: 0 0 20px 10px;

	&:hover {
		cursor: pointer;
	}
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	display: flex;
	align-items: center;
	height: 100%;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>

						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 16px" onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
