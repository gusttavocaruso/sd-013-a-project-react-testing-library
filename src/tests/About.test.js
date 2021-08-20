import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Conjunto que verifica a existência de informações de texto', () => {
  test('Testes que verificam a existência de um heading e informações da página', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByText('About Pokédex');
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testes que verificam a existência de parágrafos na página', () => {
    renderWithRouter(<About />);
    const textAux = 'This application simulates a Pokédex, a';
    const textAux2 = 'digital encyclopedia containing all Pokémons';
    const textAux3 = 'One can filter Pokémons by type, and';
    const textAux4 = 'see more details for each one of them';
    const aboutFirstParagraph = screen.getByText(`${textAux} ${textAux2}`);
    expect(aboutFirstParagraph).toBeInTheDocument();
    const aboutSecondParagraph = screen.getByText(`${textAux3} ${textAux4}`);
    expect(aboutSecondParagraph).toBeInTheDocument();
  });
});

describe('Conjunto para verificar a existência de uma imagem na página', () => {
  test('Testa a existência de uma imagem na página', () => {
    renderWithRouter(<About />);
    const aboutImg = screen.getByRole('img');
    expect(aboutImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
