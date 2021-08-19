import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente About', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const textMoreDetails = screen.getByText(/more details/i);
    expect(textMoreDetails).toBeInTheDocument();
  });

  test('Se a página contém um h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const h2About = screen.getByRole('heading', { name: /about pokédex/i });
    expect(h2About).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre pokédex', () => {
    render(<About />);
    const firstP = screen.getByText(/simulates a pokédex/i);
    const secondP = screen.getByText(/can filter pokémons/i);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  test('Se a página contém uma imagem com src específico', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { src } = screen.getByRole('img');
    expect(src).toBe(url);
  });
});
