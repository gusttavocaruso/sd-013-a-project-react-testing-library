import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando topo da aplicação', () => {
  it('deve renderizar o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  it('deve renderizar o texto About', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/About/i);
    expect(home).toBeInTheDocument();
  });

  it('deve renderizar o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Favorite Pokémons/i);
    expect(home).toBeInTheDocument();
  });
});
