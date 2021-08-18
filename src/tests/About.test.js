import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About.js', () => {
  it('Testa se existem parágrafos explicando o site', () => {
    renderWithRouter(<About />);
    const firstP = screen.getByText(/this application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by type,/i);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });
  it('Testa se existe um header com o texto About Pokedex', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(header).toBeInTheDocument();
  });
  it('Testa se existem dois paragrafos com texto na About', () => {
    renderWithRouter(<About />);
    const allText = screen.getAllByText(/application simulates|filter pokémons/i);
    expect(allText).toHaveLength(2);
  });
  it('Testa se a página tem a imagem de uma pokedex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
    expect(image).toBeInTheDocument();
  });
});
