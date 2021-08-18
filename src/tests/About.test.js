test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  it('Testa se tem 2 paragrafos trazendo as informacoes sobre a pokedex', () => {
    renderWithRouter(<About />);
    const info = screen.getByText(/This application simulates a Pokédex, /i);
    const info2 = screen.getByText(/One can filter Pokémons by type, /i);
    expect(info).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
    expect(info.tagName).toBe('P');
    expect(info2.tagName).toBe('P');
  });

  it('Testa se tem o heading', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', {
      level: 2,
    });
    expect(header).toHaveTextContent(/About Pokédex/i);
  });

  it('Testa se a imagem aparece', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
