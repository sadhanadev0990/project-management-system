import { createAction } from '@reduxjs/toolkit';
import { Login, Signup } from './UserModel';
import * as types from '../../common/constants/types';

export const userLogin = createAction<{ user: Login }>(types.USER_LOGIN);

export const userSignup = createAction<{ user: Signup }>(types.USER_REGISTER);

export const userLogout = createAction(types.USER_LOGOUT);

export const getUser = createAction(types.GET_USER);
