import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { Comment } from './components';
import { ROLE } from '../../../../constants';
import { Icon } from '../../../../components';

import { addCommentAsync } from '../../../../action/add-comment-async';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants/constants/prop-type';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');

	const dispatch = useDispatch();

	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="80px 0 0 10px"
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 624px;
	margin: 10px auto;

	& .new-comment {
		width: 600px;
		display: flex;
		margin: 20px 0 0;
		height: 120px;
	}

	& .new-comment textarea {
		width: 600px;
		resize: none;
		font-size: 18px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
