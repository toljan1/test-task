import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import TickersPage from './components/TickersPage/TickersPage';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import UserTickersPage from './components/UserTickersPage/UserTickersPage';
const routesObject = [
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundPage />,
		children: [
			{ path: '/TickersPage', element: <TickersPage /> },
			{ path: '/UserTickersPage', element: <UserTickersPage /> },
		],
	},
];

test('If NotFoundPage is rendered', () => {
  render(<NotFoundPage />);
  const screenText = screen.getByText('Sorry, we didn\'t find anything');
  expect(screenText).toBeInTheDocument();
});

test("If HomePage is rendered!", () => {
  render(<HomePage />);
  const screenText = screen.getByText('Home Page');
  expect(screenText).toBeInTheDocument();
});

test('If full app is navigating', async () => {
	const router = createMemoryRouter(routesObject, {
		initialEntries: ['/'],
	});
	render(<RouterProvider router={router} />);

  const link = screen.getByRole('link', { name: 'Trending Tickers' });

	await userEvent.click(link);
	expect(screen.getByText('Our tickers:')).toBeInTheDocument();
});
