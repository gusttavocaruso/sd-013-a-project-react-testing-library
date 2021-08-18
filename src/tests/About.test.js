import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Teste o componente About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const msg1 = /This application simulates a Pokédex, a digital encyclopedia/i;
    const mqs2 = /One can filter Pokémons by type, and see more details for each one/i;

    const p1 = screen.getByText(msg1);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(mqs2);
    expect(p2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    const src = img.src.includes('Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(src).toBeTruthy();
  });
});
