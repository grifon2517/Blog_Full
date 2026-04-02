import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Error } from './components';
import { useDispatch } from 'react-redux';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { useLayoutEffect } from 'react';
import { setUser } from './action';
import styled from 'styled-components';
import { Modal } from './components/modal/modal';
import { ERROR } from './constants';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	min-height: 100vh;
	margin: 0 auto;
	background-color: #fff;
`;
const Page = styled.div`
	flex: 1;
	padding: 120px 0 20px;
	justify-content: center;

	align-items: center:
`;

const H2 = styled.h2`
	text-align: center;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<H2></H2>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/posts/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
