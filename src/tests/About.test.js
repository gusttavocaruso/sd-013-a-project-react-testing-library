import React from 'react';
import { screen } from '@testing-library/react';
import { About, renderWithRouter } from '../components';

describe('2- Testa o componente About.js', () => {
  beforeEach(() => renderWithRouter(<About />));
  test('A página contém um heading h2 com o texto About Pokédex.', () => {
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('A página contém dois parágrafos sobre a Pokédex.', () => {
    const paragraph1 = screen.getByText(/this application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/one can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('A página contém dois parágrafos sobre a Pokédex.', () => {
    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
