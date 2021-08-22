import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

// Grupo de testes do requisito 2"
describe('Teste o componente <About.js />. (req2)', () => {
  it('contém um heading h2 com o texto "About Pokédex"', () => {
    // Acessa os elementos da tela
    renderWithRouter(<About />);
    const h2Heading = screen.getByRole('heading',
      { name: /About Pokédex/i,
        level: 2 });

    // Faz o teste
    expect(h2Heading).toBeInTheDocument();
  });

  it('contém dois parágrafos com texto sobre a Pokédex', () => {
    // Acessa os elementos da tela
    renderWithRouter(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by type/i);

    // Faz o teste
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  it('página contém uma imagem específica da Pokédex', () => {
    // Acessa os elementos da tela
    renderWithRouter(<About />);
    const image = screen.getByAltText(/Pokédex/i);

    // Faz o teste
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
