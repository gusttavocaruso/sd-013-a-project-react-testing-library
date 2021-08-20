import React from 'react';
import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';

describe('Testing Component Pokemon:', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    render(<Pokemon />);
  });

  test('Teste se o card do Pokémon contém um link de navegação para os detalhes.', () => {
    render(<Pokemon />);
  });

  test('Teste o link de nav é redirecionado para detalhes de Pokémon.', () => {
    render(<Pokemon />);
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>.', () => {
    render(<Pokemon />);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(<Pokemon />);
  });
});
