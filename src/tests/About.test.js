import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { from } from 'array-flatten';
import React from 'react';
// import testUtils from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { About } from '../components';

describe('Teste About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const pokedexInfo = screen.getByText(/About Pokédex/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const headerPokemon = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(headerPokemon).toBeInTheDocument();
  });
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const paragraphPokemon = screen.getByRole('heading', {
    name: / /i,
  });

  expect(paragraphPokemon).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const imgPokemon = screen.getByRole('img');

  expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
