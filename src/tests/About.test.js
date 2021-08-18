import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente about ', () => {
  it('testa de tem um h2', () => {
    render(<About />);
    const h2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  it('testa de tem o primeiro parágrafo', () => {
    render(<About />);
    const firstp = screen.getByText(/This application simulates a Pokédex,/);
    expect(firstp).toBeInTheDocument();
  });
  it('testa de tem o segundo parágrafo', () => {
    render(<About />);
    const secondp = screen.getByText(/One can filter Pokémons by type/);
    expect(secondp).toBeInTheDocument();
  });
  it('testa de tem imagem', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
