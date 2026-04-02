import { Error } from '../error/error';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils/check-access';
import { ERROR } from '../../constants';
import { PROP_TYPE } from '../../constants/constants/prop-type';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	serverError: PROP_TYPE.ERROR,
};
