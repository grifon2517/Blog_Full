import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../action';
import { SpecialPanel } from '../special-panel/special-panel';
import { Input, Icon } from '../../../../components';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants/constants/prop-type';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitlelValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitlelValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/posts/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitlelValue(target.value);

	return (
		<div className={className}>
			<Input value={imageUrlValue} placeholder="Изображение..." onChange={onImageChange} />
			<Input value={titleValue} placeholder="Заголовок..." onChange={onTitleChange} />
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0 "
				editButton={<Icon id="fa-floppy-o" margin="0 10px 0 0" onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		border: 1px solid #000;
		min-height: 80px;
		font-size: 18px;
		white-space: break-spaces;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
