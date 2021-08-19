import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente About', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      name: 'About Pokédex',
    });

    expect(aboutText).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText(/pokédex/i);
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
