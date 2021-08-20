import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
  });
});
