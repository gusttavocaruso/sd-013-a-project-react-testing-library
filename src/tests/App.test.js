import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRoute from './renderWithRoute';
//
describe('Teste do componente App', () => {
  renderWithRoute(<App />);
  it('O primeiro link deve possuir o text Home', () => {
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument('');
  });
  it('Testa o link about', () => {
    renderWithRoute(<App />);
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument('');
  });
  it('Testa o link Favorite Pokémons', () => {
    renderWithRoute(<App />);
    const FavPokemons = screen.getByText(/Favorite Pokémons/i);
    expect(FavPokemons).toBeInTheDocument('');
  });
});
