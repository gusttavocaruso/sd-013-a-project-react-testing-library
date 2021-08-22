import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa componente Favorite Pokemons.js', () => {
  it('testa se é exibida a msg "No Favorite Pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });
  it('teste se é exibido todos os cards de pokemon favoritados', () => {
    renderWithRouter(<App />);
    // (?) não entendi pq tem que renderizar o <App /> e não o FavoritePokemons. a pag. favoritePókemons
    // contém apenas os botões seria isso. o <App/> renderiza tudo(?)
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
