// /* eslint-disable @typescript-eslint/indent */
// /* eslint-disable react/require-default-props */
// /* eslint-disable react/function-component-definition */
// /* eslint-disable import/no-extraneous-dependencies */
// import React, { ReactElement } from 'react';
// import { Store } from 'redux';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';

// import rootReducer from '../../redux/rootReducer';

// const TestReduxWrapper =
// 	(store: Store) =>
// 	({ children }: { children?: React.ReactNode }) =>
// 		(
// 			<Provider store={store}>
// 				<BrowserRouter>{children}</BrowserRouter>
// 			</Provider>
// 		);

// const RenderTestComponent = (
// 	component: ReactElement,
// 	{
// 		initialState,
// 		store = configureStore({
// 			reducer: rootReducer,
// 			preloadedState: initialState
// 		}),
// 		...renderOptions
// 	}
// ) => {
// 	return render(component, {
// 		wrapper: TestReduxWrapper(store),
// 		...renderOptions
// 	});
// };

// export * from '@testing-library/react';

// export { RenderTestComponent };
