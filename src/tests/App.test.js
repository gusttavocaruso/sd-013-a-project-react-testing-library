import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

it('deve renderizar o componente Home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /Home/i });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const aboutAll = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(aboutAll).toBeInTheDocument();
});

it('deve renderizar o componente About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: /About/i });
  userEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const aboutAll = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(aboutAll).toBeInTheDocument();
});

it('deve renderizar o componente Home', () => {
  const { history } = renderWithRouter(<App />);
  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const aboutAll = screen.getByRole('heading', { name: /Favorite pokémons/i });
  expect(aboutAll).toBeInTheDocument();
});
