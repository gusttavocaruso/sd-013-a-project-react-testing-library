import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../types/renderWithRouter';
import App from '../App';

describe('Testando componente Pokedex', () => {
  test('Testa se página contém um heading h2', () => {
    renderWithRouter(<App />);

    const dexHeader = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(dexHeader).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando aperta o botão', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const charmanderNext = screen.getByRole('img', {
      name: /charmander sprit/i,
    });

    expect(charmanderNext).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    // Tinha tentado capiturando usando uma imagem e verificando se tinha apenas uma, mas não retornava...
    // ...número, por óbvio não deu certo. Inspecionando o elemento html com as infos dos pokemons,...
    // percei o data-testid :D
    const idOnePoke = screen.getAllByTestId('pokemon-name');

    expect(idOnePoke).toHaveLength(1);
  });
});

describe('Continuação dos testes do componente Pokedex', () => {
  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButtons = 7;
    const pokeTypeButton = screen.getAllByTestId('pokemon-type-button');

    expect(pokeTypeButton.length).toBe(allButtons);
    // Referência: https://github.com/testing-library/jest-dom
    expect(pokeTypeButton[0]).toHaveTextContent(/electric/i);
    expect(pokeTypeButton[1]).toHaveTextContent(/fire/i);
    expect(pokeTypeButton[2]).toHaveTextContent(/bug/i);
    expect(pokeTypeButton[3]).toHaveTextContent(/poison/i);
    expect(pokeTypeButton[4]).toHaveTextContent(/psychic/i);
    expect(pokeTypeButton[5]).toHaveTextContent(/normal/i);
    expect(pokeTypeButton[6]).toHaveTextContent(/dragon/i);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const bugButton = screen.getByRole('button', {
      name: /bug/i,
    });

    userEvent.click(bugButton);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(allButton);

    const pikachuRender = screen.getByText(/pikachu/i);

    expect(pikachuRender).toBeInTheDocument();
  });
});
