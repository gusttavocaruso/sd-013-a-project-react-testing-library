import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2', () => {
  test('A página contém um heading h2', () => {
    render(<About />);

    const info = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(info).toBeInTheDocument();
  });

  test('A página contém dois parágrafos', () => {
    render(<About />);

    const textParam = screen.getByText(/This application simulates a Pokédex/);
    expect(textParam).toBeInTheDocument();

    const textParam2 = screen.getByText(/One can filter Pokémons by type/);
    expect(textParam2).toBeInTheDocument();
  });

  test('A página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);

    const img = screen.getByRole('img');
    expect(img.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
