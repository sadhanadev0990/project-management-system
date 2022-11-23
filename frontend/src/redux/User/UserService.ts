/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
import { Login, Signup } from './UserModel';

import { postAuthApiInstance, getApiInstance } from '../config/apiconfig';
import * as api from '../../common/constants/api';

export const userLogin = async (user: Login): Promise<string | undefined> => {
	try {
		const response = await postAuthApiInstance(api.GET_LOGIN_URL, user);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const userSignup = async (user: Signup): Promise<string | undefined> => {
	try {
		const response = await postAuthApiInstance(api.GET_SIGNUP_URL, user);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const userLogout = async (): Promise<string | undefined> => {
	try {
		const response = await getApiInstance(api.GET_LOGOUT_URL);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
