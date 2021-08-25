import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { About } from '../components';

describe('Testando About.js', () => {
  beforeEach(() => renderWithRouter(<About />));

  test('Testar se existe um h2 com o texto "About Pokédex"', () => {
    const headingH2 = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos sobre a Pokédex', () => {
    const paragraphOne = screen.getByText((result) => result.startsWith('This app'));
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphOne).toHaveTextContent('encyclopedia containing all Pokémons');

    const paragraphTwo = screen.getByText((result) => result.startsWith('One can'));
    expect(paragraphTwo).toBeInTheDocument();
    expect(paragraphTwo).toHaveTextContent('see more details for each one of them');
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
