import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('FavoritePokemons.js testes', () => {
  test('este se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons />
      </BrowserRouter>,
    );
    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    expect(history.location.pathname).toEqual('/pokemons/25');

    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);

    const pikachuFavorite = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(pikachuFavorite).toBeInTheDocument();

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritePokemon);

    expect(history.location.pathname).toEqual('/favorites');

    const pikachu = screen.getByTestId('pokemon-name');

    expect(pikachu).toBeInTheDocument();
  });
});
