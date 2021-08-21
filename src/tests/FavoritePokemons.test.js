import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );

    const paragrafoText = screen.getByText(/no favorite pokemon found/i);

    expect(paragrafoText).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const detalhes = screen.getByText(/more details/i);
    userEvent.click(detalhes);

    const favoritado = screen.getByText(/favoritado?/i);
    userEvent.click(favoritado);

    const favorito = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favorito);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });
});
