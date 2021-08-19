import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testando o componente favorite', () => {
  it('exibe mensagem no favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const firstp = screen.getByText(/No favorite pokemon found/);
    expect(firstp).toBeInTheDocument();
  });
  it('testa se o pokemon é favoritado', () => {
    renderWithRouter(<App />);
    const textDetails = screen.getByText(/more details/i);
    userEvent.click(textDetails);
    const pokeFavorite = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(pokeFavorite);
    const favorite = screen.getByRole('link',
      { name: /Favorite Pokémons/ });
    userEvent.click(favorite);
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
    const eletric = screen.getByText(/Electric/);
    expect(eletric).toBeInTheDocument();
    const average = screen.getByText(/Average weight/i);
    expect(average).toBeInTheDocument();
  });
});
