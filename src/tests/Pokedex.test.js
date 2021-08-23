import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  test('Testa se é exibido um h2 com o texto "Encountered pokémons".', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon ao clicar no botão.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const proxPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(proxPoke).toBeInTheDocument();
    userEvent.click(proxPoke);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(/charmander/i);
  });
});
