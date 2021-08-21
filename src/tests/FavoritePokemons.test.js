import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o componente FavoritePokemons.js', () => {
  test('se é exibido "No favorite pokemon found", se não houver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
