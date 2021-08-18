import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<FavoritePokemons />);

    const getTextFavPokemons = screen.getByText(/No favorite pokemon found/i);
    expect(getTextFavPokemons).toBeInTheDocument();
  });
});
