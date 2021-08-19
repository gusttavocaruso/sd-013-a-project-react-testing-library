import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando topo da aplicação', () => {
  it('deve renderizar o texto Home', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundPokemon).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    fireEvent.click(moreDetails);

    const clickCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    fireEvent.click(clickCheckbox);
    expect(clickCheckbox.checked).toBe(true);

    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePokemons);
    const namePokemon = screen.getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });
});
