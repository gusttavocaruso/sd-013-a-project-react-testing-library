import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const searchH2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(searchH2).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = /This application simulates a Pokédex, a digital/i;
    const secondParagraph = /One can filter Pokémons by type, and see more details for/i;
    const searchFirstP = screen.getByText(firstParagraph);
    expect(searchFirstP).toBeInTheDocument();
    const searchSecondP = screen.getByText(secondParagraph);
    expect(searchSecondP).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    const src = img.src.includes('Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(src).toBeTruthy();
  });
});
