import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Testa o heading', () => {
  it('Testa se o h2 possui o texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('About Pokédex');
  });
  it('Testa se possui 2 parágrafos com texto sobre a pokedex', () => {
    render(<About />);
    expect(screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons')).toBeInTheDocument();
    expect(screen.getByText('One can filter Pokémons by '
    + 'type, and see more details for each one of them')).toBeInTheDocument();
  });
  it('Testa se a página contém uma imagem específica', () => {
    render(<About />);
    const elementoImg = screen.getByRole('img');
    expect(elementoImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
