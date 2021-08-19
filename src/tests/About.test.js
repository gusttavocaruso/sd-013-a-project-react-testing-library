import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('About.js Test', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('Aplicação contém informações sobre a Pokédex', () => {
    const info = screen.getAllByText(/pokémons/i);

    expect(info).toHaveLength(2);
  });

  test('Aplicação contém um "h2" com "About Pokédex"', () => {
    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2.textContent).toStrictEqual('About Pokédex');
  });

  test('Aplicação contém imagem da Pokédex', () => {
    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(src);
  });
});
