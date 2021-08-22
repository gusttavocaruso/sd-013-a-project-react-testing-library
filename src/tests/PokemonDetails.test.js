import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { PokemonDetails } from '../components';

describe('Testa o componente PokemonDetails.', () => {
  test('Testa se é exibido o texto "<name> Details", <name> = nome do pokémon', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <PokemonDetails />
      </Router>,
    );

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    expect(moreDetails).toBeInTheDocument();
  });
});
