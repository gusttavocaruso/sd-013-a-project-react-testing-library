import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('FavoritePokemons.js tests', () => {
  test('Renderiza a mensagem No favorite pokemon found', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons />
      </BrowserRouter>,
    );

    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    userEvent.click(screen.getByRole('link', {
      name: 'More details',
    }));

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const pokeName = screen.getByTestId('pokemon-name');

    expect(pokeName).toBeInTheDocument();
  });
});
