export interface Login {
	email: string;
	password: string;
}

export interface Signup {
	name: string;
	email: string;
	role: string;
	password: string;
}

export interface LoginRes {
	status: boolean;
	user: {
		name: string;
		email: string;
		role: string;
		_id: string;
	};
	token: string;
}

export interface Error {
	error: boolean;
	message: object;
	status: string;
}

export interface User {
	name: string;
	email: string;
	role: string;
	_id: string;
}
