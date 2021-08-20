import React from 'react';
import { render, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

describe('Testing Component Pokedex:', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(<Pokedex />);

    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    render(<Pokedex />);

    const pokeButtonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(pokeButtonNext).toBeInTheDocument();

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;

  // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(<Pokedex />);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    render(<Pokedex />);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    render(<Pokedex />);

    const pokeButtonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(pokeButtonAll).toBeInTheDocument();
  });
});
