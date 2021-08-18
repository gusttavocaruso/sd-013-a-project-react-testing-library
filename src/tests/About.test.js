import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém um h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const h2Text = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(h2Text).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    screen.getByText(/This application simulates a Pokédex/i,
      /a digital encyclopedia containing all Pokémons/i);
    screen.getByText(/One can filter Pokémons by type/i,
      /and see more details for each one of them/i);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText(/Pokédex/i);
    expect(img.src).toContain(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
