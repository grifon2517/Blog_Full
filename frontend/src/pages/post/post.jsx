import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RESET_POST_DATA, loadPostAsync } from '../../action';
import { PostContent, Comments, PostForm } from './components';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import styled from 'styled-components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsloading] = useState(true);
	const isEditing = !!useMatch('/posts/:id/edit');
	const isCreating = !!useMatch('/post');

	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsloading(false);
			return;
		}

		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsloading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 0 80px;
	margin: 40px 0;
`;
