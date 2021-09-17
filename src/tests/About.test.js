import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Componente About', () => {
  test('Página contém heading h2 com texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexParagraphs = screen.getAllByText(/Pokémons/);
    expect(pokedexParagraphs).toHaveLength(2);
  });

  test('Página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toStrictEqual(src);
  });
});
