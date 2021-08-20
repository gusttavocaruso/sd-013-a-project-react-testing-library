import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes para About', () => {
  it('Verifica se a pagina contem um "h2"', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByText(/About Pokédex/i);
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se a pagina contem duas tags "p"', () => {
    renderWithRouter(<About />);
    const p1Text = /This application simulates a Pokédex, a digital encyclopedia /i;
    const p2Text = /One can filter Pokémons by type, and see more details/i;
    const p1 = screen.getByText(p1Text);
    const p2 = screen.getByText(p2Text);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it('Verifica se a pagina contem uma "img"', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
