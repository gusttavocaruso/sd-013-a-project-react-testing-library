import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRoute from './renderWithRoute';
import About from '../components/About';

describe('Teste do componente About', () => {
  it('Teste se a página contém um heading h2 com texto >About Pokédex<', () => {
    renderWithRoute(<About />);
    const elementHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(elementHeading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com o texto sobre a Pokédex', () => {
    renderWithRoute(<About />);
    const elementsP = screen.getAllByText(/Pokémons/);
    expect(elementsP.length).toBe(2);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRoute(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
