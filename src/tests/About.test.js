import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const getTextPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(getTextPokedex).toBeInTheDocument();
  });

  test('Testa se About tem um heading h2 com o texto About Pokédex ', () => {
    renderWithRouter(<About />);

    const getHeading = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });

  test('Testa se a página contém 2 parágrafos', () => {
    renderWithRouter(<About />);

    const getParagraph = screen.getByText(/a digital encyclopedia containing/i);
    expect(getParagraph).toBeInTheDocument();

    const getParagraph2 = screen.getByText(/by type, and see more/i);
    expect(getParagraph2).toBeInTheDocument();
  });

  // Teste abaixo feito com a ajuda do repositório da pessoa estudante Carlos Gessé
  test('Testa se a página contém uma imagem', () => {
    renderWithRouter(<About />);

    const getImage = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(getImage.src).toBe(src);
  });
});
