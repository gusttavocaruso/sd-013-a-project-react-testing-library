import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Componente FavoritePokemons', () => {
  test('se é exibido na tela uma mensagem caso não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    // userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
