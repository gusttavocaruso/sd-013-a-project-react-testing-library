import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRoute from './renderWithRoute';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente favorite pokémons', () => {
  test('Testa se a pessoa não tiver pokémons favoritos', () => {
    renderWithRoute(<FavoritePokemons />);
    const notFoundFavorite = screen.getByText('No favorite pokemon found');
    expect(notFoundFavorite).toBeInTheDocument('');
  });
  test('Testa se é exibido todos os cards', () => {
    renderWithRoute(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details',
    }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument('');
  });
});
