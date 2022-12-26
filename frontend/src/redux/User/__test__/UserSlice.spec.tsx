import { store } from '../../store';
import { userLogin, userSignup, userLogout } from '../UserAction';
import {
	setLoginStatus,
	setSignupStatus,
	setLoadStatus,
	setAPIError,
	setUserAuthenticated,
	setLogoutStatus
} from '../UserSlice';

describe('UserSlice', () => {
	it('Should handle login request', () => {
		const response = {
			status: true,
			user: {
				name: 'sadhana1',
				email: 'sadhana1@gmail.com',
				role: 'admin',
				password: 'test@1234'
			},
			token: ''
		};
		const payload = {
			user: {
				// name: 'sadhana1',
				email: 'sadhana1@gmail.com',
				// role: 'admin',
				password: 'test@1234'
			}
		};

		store.dispatch(userLogin(payload));
		store.dispatch(setLoadStatus(true));
		store.dispatch(setLoginStatus({ loginUser: response }));
		store.dispatch(setUserAuthenticated(true));
		store.dispatch(setAPIError({ error: {} }));
		store.dispatch(setLoadStatus(false));
		const { loginUser } = store.getState().user;
		expect(loginUser).toBeDefined();
	});

	it('Should handle signup request', () => {
		const response = {
			status: true,
			user: {
				name: 'sadhana1',
				email: 'sadhana1@gmail.com',
				role: 'admin',
				password: 'test@1234'
			},
			token: ''
		};
		const payload = {
			user: {
				name: 'sadhana1',
				email: 'sadhana1@gmail.com',
				role: 'admin',
				password: 'test@1234'
			}
		};
		store.dispatch(userSignup(payload));
		store.dispatch(setSignupStatus({ signupUser: response }));
		const { signupUser } = store.getState().user;
		expect(signupUser).toBeDefined();
	});

	it('Should handle user logout', () => {
		const response = {
			success: 'success'
		};
		store.dispatch(userLogout());
		store.dispatch(setLogoutStatus(response));
		const { userStatus } = store.getState().user;
		expect(userStatus).toBeDefined();
	});
});
