/* eslint-disable jest/expect-expect */
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { watchUserSagas } from '../UserSaga';
import { userLogin, userSignup, userLogout } from '../UserAction';
import {
	setLoginStatus,
	setSignupStatus,
	setLoadStatus,
	setAPIError,
	setLogoutStatus
} from '../UserSlice';
import * as UserService from '../UserService';

describe('User Sagas - Login', () => {
	const payload = {
		user: {
			name: 'sadhana1',
			email: 'sadhana1@gmail.com',
			role: 'admin',
			password: 'test@1234'
		}
	};

	it('User login', async () => {
		return expectSaga(watchUserSagas)
			.provide([[matchers.call.fn(UserService.userLogin), payload]])
			.put(setLoginStatus(payload))
			.dispatch(userLogin(payload))
			.silentRun();
	});

	it('handles errors', () => {
		const error = new Error('error');

		return expectSaga(watchUserSagas)
			.provide([[matchers.call.fn(UserService.userLogin), throwError(error)]])
			.put(setLoadStatus(true))
			.put(setAPIError({ error }))
			.put(setLoadStatus(false))
			.dispatch(userLogin(payload))
			.silentRun();
	});
});

describe('User Sagas - Signup', () => {
	const payload = {
		user: {
			name: 'sadhana1',
			email: 'sadhana1@gmail.com',
			role: 'admin',
			password: 'test@1234'
		}
	};
	it('User Signup', async () => {
		return expectSaga(watchUserSagas)
			.provide([[matchers.call.fn(UserService.userSignup), payload]])
			.put(setAPIError({ error: {} }))
			.put(setSignupStatus(payload))
			.dispatch(userSignup(payload))
			.silentRun();
	});

	it('handles errors', () => {
		const error = new Error('error');

		return expectSaga(watchUserSagas)
			.provide([[matchers.call.fn(UserService.userSignup), throwError(error)]])
			.put(setLoadStatus(true))
			.put(setAPIError({ error }))
			.put(setLoadStatus(false))
			.dispatch(userSignup(payload))
			.silentRun();
	});
});

describe('User Sagas - Logout', () => {
	it('User Logout', async () => {
		const response = {
			success: 'success'
		};
		return expectSaga(watchUserSagas)
			.provide([[matchers.call.fn(UserService.userLogout), response]])
			.put(setLogoutStatus(response))
			.dispatch(userLogout())
			.silentRun();
	});
});
