import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('se é exibido "No favorite pokemon found" se não tiver pokémons favoritos', () => {
  render(<BrowserRouter><FavoritePokemons /></BrowserRouter>);

  const notFound = screen.getByText(/No favorite pokemon found/i);
  expect(notFound).toBeVisible();
});

test('se é exibido todos os cards de pokémons favoritados', () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  userEvent.click(screen.getByText(/more details/i));
  userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado/i }));
  userEvent.click(screen.getByText(/favorite pokémons/i));

  const favoritePokemons = screen.getByAltText(/is marked as favorite/i);
  expect(favoritePokemons).toHaveAttribute('src', '/star-icon.svg');
});
