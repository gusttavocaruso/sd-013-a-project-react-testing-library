import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa os componentes do App', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();
  });
});
