/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    setLoginStatus,
    setSignupStatus,
    setLoadStatus,
    setUserAuthenticated,
    setAPIError,
    setLogoutStatus
} from './UserSlice';
import * as UserAction from './UserAction';
import * as UserService from './UserService';
import { LoginRes } from './UserModel';

export function* userLogin(action: ReturnType<typeof UserAction.userLogin>) {
    try {
        yield put(setLoadStatus(true));
        const response: LoginRes = yield call(
            UserService.userLogin,
            action.payload.user
        );
        if (response.user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            yield put(setUserAuthenticated(true));
            yield put(setLoginStatus(response));
            yield put(setAPIError({ error: {} }));
        } else {
            yield put(setAPIError({ error: response }));
        }

    } catch (error) {
        yield put(setUserAuthenticated(false));
        yield put(setAPIError({ error }));
    }
    yield put(setLoadStatus(false));
}

export function* userSignup(action: ReturnType<typeof UserAction.userSignup>) {
    try {
        yield put(setLoadStatus(true));
        const response: LoginRes = yield call(
            UserService.userSignup,
            action.payload.user
        );
        if (response.user) {
            yield put(setAPIError({ error: {} }));
            yield put(setSignupStatus(response));
        } else {
            yield put(setAPIError({ error: response }));
        }
    } catch (error) {
        yield put(setAPIError({ error }));
    }
    yield put(setLoadStatus(false));
}

export function* userLogout() {
    try {

        const response: LoginRes = yield call(
            UserService.userLogout
        );
        yield put(setLogoutStatus(response));
    } catch (error) {
        yield put(setAPIError({ error }));
    }
    yield put(setLoadStatus(false));
}

export function* watchUserSagas() {
    yield all([
        takeLatest(UserAction.userLogin.type, userLogin),
        takeLatest(UserAction.userSignup.type, userSignup),
        takeLatest(UserAction.userLogout.type, userLogout)
    ]);
}
