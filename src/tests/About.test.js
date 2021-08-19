import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste se a página About contém as informações sobre a Pokédex.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument('About Pokédex');
  });
});

describe('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  test('Renderiza o primeiro parágrafo', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex,/);
    expect(firstParagraph).toBeInTheDocument();
  });
  test('Renderiza o segundo parágrafo', () => {
    renderWithRouter(<About />);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type,/);
    expect(secondParagraph).toBeInTheDocument();
  });
});

describe('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  test('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
