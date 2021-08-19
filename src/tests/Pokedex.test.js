import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 5', () => {
  it('Verficia se ha um H2 com texto correto', () => {
    renderWithRouter(<App />);
    // Acessar o elemetno H2
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se aparece o proximo pokemon ao clicar no botao', () => {
    renderWithRouter(<App />);
    // Verificar se o primeiro pokemon é o pikachu
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    // Achar o botao 'proximo pokemon'
    const btn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    // Clicar no botao e verififar se charmander é renderizado na tela
    userEvent.click(btn);
    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
    // Repitir o processo e encontrar o caterpie
    userEvent.click(btn);
    const thirdPokemon = screen.getByText('Caterpie');
    expect(thirdPokemon).toBeInTheDocument();
    // Clicar no ultimo leva ao primeiro
    const btnToLastPok = screen.getByRole('button', {
      name: /dragon/i,
    });
    userEvent.click(btnToLastPok);
    const lastPokemon = screen.getByText('Dragonair');
    expect(lastPokemon).toBeInTheDocument();
    // clica no proximo
    userEvent.click(btn);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('verifica se aparece um unico pokemon na tela', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  it('Verfica se ha botao de filtragem por tipo', () => {
    renderWithRouter(<App />);
    // Pegar os botoes todos
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    buttons.forEach((button, index) => expect(button).toHaveTextContent(types[index]));
  });
  it('Verifica se All reseta o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
