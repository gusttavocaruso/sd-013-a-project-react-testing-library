import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const headingH2 = screen.getByRole('heading');
    expect(headingH2.textContent).toBe('About Pokédex');
  });
  it('Teste se a página contém o parágrafo 1 com texto sobre a Pokédex.', () => {
    render(<About />);
    const para1 = screen.getByText(/This application simulates a Pokédex,/i);
    expect(para1).toBeInTheDocument();
  });
  it('Teste se a página contém o parágrafo 2 com texto sobre a Pokédex.', () => {
    render(<About />);
    const para2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(para2).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
