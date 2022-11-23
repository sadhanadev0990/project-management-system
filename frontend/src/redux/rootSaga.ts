import { all, fork } from 'redux-saga/effects';
import { watchProjectSagas } from './Project/ProjectSaga';
import { watchUserSagas } from './User/UserSaga';

export function* rootSaga() {
	yield all([fork(watchProjectSagas), fork(watchUserSagas)]);
}
