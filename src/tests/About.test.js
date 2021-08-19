import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('About.js tests', () => {
  test('A página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByText(/About Pokédex/i);
    expect(aboutPokedex).toBeDefined();
  });

  test('A página contém dois parágrafos com o texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application simulates/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  test('A página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByRole('img');

    expect(img.src).toBe(imgLink);
  });
});
