import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testing Component About:', () => {
  beforeEach(() => { renderWithRouter(<About />); }); // <= Adicionando esta função para não repetir a chamada do renderWithRouter em cada test;
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const aboutText = screen.getByRole('heading', {

      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const T1 = (
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons'
    );
    const aboutT1 = screen.getByText(T1);
    expect(aboutT1).toBeInTheDocument();
    const aboutT2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    expect(aboutT2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex.', () => {
    const aboutImg = screen.getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImg).toHaveAttribute('alt', 'Pokédex');
  });
});
