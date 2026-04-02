import PropTypes from 'prop-types';
import { Icon } from '../../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../../../action';

import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, publishedAt, content }) => {
	const dispatch = useDispatch();

	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий',
				onConfirm: () => {
					dispatch(removeCommentAsync(id, postId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive={true}
							id="fa-user-circle-o"
							size="18px"
							margin="0 10px 0 0"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="comment-text">{content}</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="18px"
							margin="0 0 0 0px"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
			</div>
			{isAdminOrModerator && (
				<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={() => onCommentRemove(id)} />
			)}
		</div>
	);
};

// Стили
export const Comment = styled(CommentContainer)`
	display: flex;
	align-items: flex-start;
	margin: 20px 0 0 0;
	width: 593px;
	max-width: 700px;

	& .comment {
		width: 600px;
		min-height: 100px;
		border: 1px solid #000;
		border-radius: 8px;
		padding: 15px;
		background-color: #f9f9f9;
		flex-grow: 1;
	}

	& .information-panel {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	& .author {
		display: flex;
		align-items: center;
		font-weight: bold;
		font-size: 14px;
	}

	& .comment-text {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.4;
		min-height: 50px;
	}

	& .published-at {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #666;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
