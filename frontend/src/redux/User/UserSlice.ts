import { createSlice } from '@reduxjs/toolkit';
import { LoginRes, Error } from './UserModel';

export interface UserState {
	isLoading: boolean;
	isAuthenticated: boolean;
	loginUser: LoginRes;
	signupUser: LoginRes;
	userStatus: boolean;
	error: Error | null;
}

const initialState: UserState = {
	isLoading: false,
	isAuthenticated: false,
	loginUser: {
		status: false,
		user: {
			name: '',
			email: '',
			role: '',
			_id: ''
		},
		token: ''
	},
	signupUser: {
		status: false,
		user: {
			name: '',
			email: '',
			role: '',
			_id: ''
		},
		token: ''
	},
	userStatus: false,
	error: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoginStatus: (state, action) => {
			state.loginUser = action.payload;
		},
		setSignupStatus: (state, action) => {
			state.signupUser = action.payload;
		},
		setLoadStatus: (state, action) => {
			state.isLoading = action.payload;
		},
		setUserAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		setAPIError: (state, action) => {
			state.error = action.payload.error;
		},
		setLogoutStatus: (state, action) => {
			state.userStatus = action.payload.success;
		}
	}
});

export const {
	setLoginStatus,
	setSignupStatus,
	setLoadStatus,
	setUserAuthenticated,
	setAPIError,
	setLogoutStatus
} = userSlice.actions;
export default userSlice.reducer;
