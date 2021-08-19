import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../types/renderWithRouter';

describe('Testa o componente About', () => {
  test('Testa se About contém informações sobre a Pokédex por parágrafos', () => {
    renderWithRouter(<About />);

    const infoPokedexOne = screen.getByText(/digital encyclopedia/i);
    const infoPokedextwo = screen.getByText(/filter pokémons by type/i);

    expect(infoPokedexOne).toBeInTheDocument();
    expect(infoPokedextwo).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2', () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    // O teste quebrava falando que esperava receber um array, para receber array se usa getAllBy
    // Referência: https://testing-library.com/docs/queries/about
    const allPara = screen.getAllByText(/digital encyclopedia|filter pokémons by type/i);

    expect(allPara).toHaveLength(2);
  });
});

test('Testa se a página contém uma imagem de uma Pokédex', () => {
  renderWithRouter(<About />);

  const pokedexImg = screen.getByRole('img');
  // Referência, Matheus Camillo pensou nessa possibilidade em call
  expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
