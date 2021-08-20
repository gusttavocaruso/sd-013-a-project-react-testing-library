import React from 'react';
import { render } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';

describe('Testing Component PokemonDetails:', () => {
  test('Teste se informações detalhadas do Pokémon são mostradas na tela.', () => {
    render(<PokemonDetails />);
  });

  test('Teste se existe uma seção com os mapas contendo as localizações do Poke.', () => {
    render(<PokemonDetails />);
  });

  test('Teste se o usuário pode fav um pokémon através da página de detalhes.', () => {
    render(<PokemonDetails />);
  });
});
