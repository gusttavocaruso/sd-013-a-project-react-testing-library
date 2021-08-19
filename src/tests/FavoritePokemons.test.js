import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../types/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe(('Testa o componente Favorite Pokemons'), () => {
  test('Testa se exibe No favorite pokemon found, se não tiver pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/no favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
  });

  test('Testa se é exibido os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const favPokeCheckBox = screen.getByRole('checkbox');
    userEvent.click(favPokeCheckBox);

    history.push('/favorites');

    const pikachuCheck = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuCheck).toBeInTheDocument();
  });
});
