import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Testa componente "<FavoritePokemon />"', () => {
  it('Testa se ao clicar em "Favorite Pokémons" renderiza', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByText('Favorite Pokémons');
    expect(linkFavorite).toBeInTheDocument();

    fireEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica que a msg "No favorite pokemon found" renderiza', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundText = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
