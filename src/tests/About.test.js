import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('teste de h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);

    const textAboutPokemons = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(textAboutPokemons).toBeInTheDocument();
  });

  test('Testa se há dois paragrafos com texto sobre a pokedex', () => {
    renderWithRouter(<About />);

    const twoP = screen.getAllByTestId('p-element');
    expect(twoP.length).toBe(2);
  });

  test('teste de contenção de imagem pokédex', () => {
    render(<About />);

    const imgPokedex = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgPokedex.src).toBe(src);
  });
});

// src ajuda do pull request da julia baptista: https://github.com/tryber/sd-013-a-project-react-testing-library/pull/64/files
