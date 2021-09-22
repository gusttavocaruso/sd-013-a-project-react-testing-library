import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const info = screen.getAllByText(/pokémons/i);
    expect(info).toHaveLength(2);
  });

  test('Verifica se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const headingText = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headingText).toBeInTheDocument();
  });

  test('Verifica se a página contém uma imagem de uma Pokédex', () => {
    const imagem = screen.getByRole('img', { name: 'Pokédex' });
    expect(imagem.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
