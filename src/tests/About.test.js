import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRoute from './renderWithRoute';

describe('Testa o componente about', () => {
  test('Testa se o documento contém o heading-h2 com o texto about pokédex', () => {
    renderWithRoute(<About />);
    const heading = screen.getByRole('heading', {
      level: 2, name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument('');
  });
  test('Verifica se a página contém dois parágrafos com texto sobre Pokédex', () => {
    renderWithRoute(<About />);
    const aboutPokedex = screen.getAllByText(/Pokémons/);
    expect(aboutPokedex.length).toBe(2);
  });
  test('Testa se a página contém a imagem da pokédex ', () => {
    renderWithRoute(<About />);
    const imagePoke = screen.getByRole('img');
    expect(imagePoke.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
