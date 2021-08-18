import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('Testando About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('se a página contém as informações sobre a Pokedéx', () => {
    const pElements = screen.getAllByText(/pokémons/i);
    expect(pElements).toHaveLength(2);
  });
  test('se a página contém um "h2" com o texto "About Pokédex"', () => {
    const h2Element = screen.getByRole('heading', {
      level: 2,
    });
    expect(h2Element.textContent).toStrictEqual('About Pokédex');
  });
  test('se a página contém a imagem de uma Pokédex', () => {
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgElement = screen.getByRole('img');
    expect(imgElement.src).toStrictEqual(srcImg);
  });
});