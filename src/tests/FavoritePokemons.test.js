import { screen, fireEvent, render } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons.js', () => {
  test('testa se é exibido na tela uma mensagem específica', () => {
    render(<FavoritePokemons />);

    const phrase = screen.getByText('No favorite pokemon found');

    expect(phrase).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', async () => {
    const { history } = renderWithRouter(<App />);

    await history.push('pokemons/25');
    await fireEvent.click(screen.getByText('Pokémon favoritado?'));
    await history.push('/favorites');
    const pokeImg = screen.getByAltText('Pikachu sprite');
    await expect(pokeImg).toBeInTheDocument();
  });
});
