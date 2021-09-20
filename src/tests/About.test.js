import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testing Component About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Teste se contém um h2 na página About.', () => {
    // renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Verifica a existência de 2 parágrafos no documento, '
     + 'com texto sobre a Pokédex', () => {
    // renderWithRouter(<About />);
    const pokemonWord = screen.getAllByText(/Pokémons/);
    expect(pokemonWord).toHaveLength(2);
  });

  test('Teste se a página contém a imagem de uma Pokédex.', () => {
    // renderWithRouter(<About />);
    const aboutImg = screen.getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImg).toHaveAttribute('alt', 'Pokédex');
  });
});
