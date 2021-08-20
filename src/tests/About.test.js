import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando o compomente About.', () => {
  test('Testando se contém um h2 com texto "About Pokédex".', () => {
    render(<About />);

    const aboutContent = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutContent).toBeInTheDocument();
  });

  test('Testa se contém dois parágrafos.', () => {
    render(<About />);

    const paragraph1 = screen.getByText(/this application simulates a pokédex/i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(/one can filter pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  test('Testa se contém uma imagem de uma pokédex.', () => {
    render(<About />);

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
