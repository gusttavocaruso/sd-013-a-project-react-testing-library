import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe(' Teste o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const text1 = /This application simulates a Pokédex/i;
    const text2 = /One can filter Pokémons by type/i;
    const paragraph1 = screen.getByText(text1);
    const paragraph2 = screen.getByText(text2);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém uma imagem da Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(url);
  });
});
