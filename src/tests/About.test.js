import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa se existe headings na Pokedex', () => {
  test('Testa se há h2 com texto About Pokedex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Testa se há 2 paragrafos sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const paragrafos = screen.getAllByText(/this application|see more details/i);
    expect(paragrafos).toHaveLength(2);
  });

  test('Testa se há imagem da Pokedex', () => {
    renderWithRouter(<About />);
    const srce = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { src: srce });
    expect(image.src).toBe(srce);
  });
});
