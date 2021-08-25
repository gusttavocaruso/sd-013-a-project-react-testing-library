import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente "Pokedex.js"', () => {
  it('verifica que existe um heading h2 com texto "Encoutered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Text = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(h2Text).toBeInTheDocument();
  });

  it('Teste se os botões estão funcionando da maneira esperada', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByText(/pikachu/i);
    userEvent.click(button);
    expect(pokemon).not.toBe(/pikachu/i);
    expect(pokemon).toBeDefined();
  });

  it('verifica se existem todos os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButtons).toBeInTheDocument();
    userEvent.click(allButtons);

    const electricButtons = screen.getByRole('button', {
      name: /electric/i,
    });
    expect(electricButtons).toBeInTheDocument();

    const fireButtons = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(fireButtons).toBeInTheDocument();

    const bugButtons = screen.getByRole('button', {
      name: /bug/i,
    });
    expect(bugButtons).toBeInTheDocument();

    const poisonButtons = screen.getByRole('button', {
      name: /poison/i,
    });
    expect(poisonButtons).toBeInTheDocument();

    const psychicButtons = screen.getByRole('button', {
      name: /psychic/i,
    });
    expect(psychicButtons).toBeInTheDocument();

    const normalButtons = screen.getByRole('button', {
      name: /normal/i,
    });
    expect(normalButtons).toBeInTheDocument();

    const dragonButtons = screen.getByRole('button', {
      name: /dragon/i,
    });
    expect(dragonButtons).toBeInTheDocument();
  });

  it('verifica se após escolher o filtro, mostra apenas pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const dragonButtons = screen.getByRole('button', {
      name: /dragon/i,
    });
    userEvent.click(dragonButtons);

    const pokemon = screen.getByText(/dragonair/i);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);

    expect(pokemon).toBeInTheDocument();
  });

  it('verifica que existe um pokemon-type-button', () => {
    renderWithRouter(<App />);

    const getDataTestId = screen.getAllByTestId('pokemon-type-button');
    expect(getDataTestId).toBeDefined();
  });
});
