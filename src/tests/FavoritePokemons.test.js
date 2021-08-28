import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testando o componente FavoritePokemons', () => {
  test('aparece na tela No favorite pokemon found se tiver 0 pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteChecking = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteChecking).toBeInTheDocument();
  });

  test('são exibidos todos os cards de pokémons favortados', () => {
    // renderiza Home
    const { history } = renderWithRouter(<App />);

    // Entra nos detalhes do primiero pokemon que aparece
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summaryHeading).toBeInTheDocument();

    // Adiciona aos favoritos
    const checkFavorite = screen.getByRole('checkbox');
    expect(checkFavorite).toBeInTheDocument();

    const pokemonNameDetails = screen.getByTestId('pokemon-name');
    expect(pokemonNameDetails).toBeInTheDocument();
    userEvent.click(checkFavorite);

    // Vai para pagina de favoritos
    history.push('/favorites');
    const pokemonNameFavorite = screen.getByTestId('pokemon-name');
    expect(pokemonNameFavorite).toBeInTheDocument();

    // Confirma se foi adicionado o pokemon correto
    expect(pokemonNameFavorite.textContent)
      .toBe(pokemonNameDetails.textContent);
  });
});
