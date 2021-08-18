import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o component App', () => {
  renderWithRouter(<App />);
  it('O primeiro link deve possuir o texto "Home"', () => {
    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto "About"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('About');
    expect(linkHome).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Favorite Pokémons');
    expect(linkHome).toBeInTheDocument();
  });
});
