import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('testar página About', () => {
  test('Página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      }),
    ).toBeInTheDocument();
  });
  test('A página contém dois parágrafos.', () => {
    render(<About />);
    expect(
      screen.getByText(/This application simulates a Pokédex/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/One can filter Pokémons by type/i),
    ).toBeInTheDocument();
  });
  test('A página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(
      screen.getByRole('img').src,
    ).toBe(src);
  });
});
