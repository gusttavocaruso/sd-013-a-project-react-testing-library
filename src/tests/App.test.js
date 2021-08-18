import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links.', () => {
  renderWithRouter(<App />);

  const getLinkHome = screen.getByRole('link', { name: /Home/i });
  userEvent.click(getLinkHome);
  expect(getLinkHome).toBeInTheDocument();

  const getLinkAbout = screen.getByRole('link', { name: /About/i });
  userEvent.click(getLinkAbout);
  expect(getLinkAbout).toBeInTheDocument();

  const getLinkFavPokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(getLinkFavPokemons);
  expect(getLinkFavPokemons).toBeInTheDocument();
});
