import { combineReducers } from 'redux';
import ProjectSlice from './Project/ProjectSlice';
import UserSlice from './User/UserSlice';

const rootReducer = combineReducers({
	project: ProjectSlice,
	user: UserSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
