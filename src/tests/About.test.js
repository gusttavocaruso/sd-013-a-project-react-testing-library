import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  test('se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const heading2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(heading2).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const aboutImg = screen.getByRole('img');
    const expectedSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(aboutImg.src).toEqual(expectedSrc);
  });
});
