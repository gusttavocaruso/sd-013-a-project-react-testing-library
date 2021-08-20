import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes para Pokedex', () => {
  it('Verifica se renderiza um "h2" com a mensagem', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se exibe o proximo pokemon ao clicar no botão', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemon = screen.getByTestId('pokemon-name');

    expect(pokemon.textContent).toBe(pokemons[0].name);

    userEvent.click(nextBtn);
    expect(pokemon.textContent).toBe(pokemons[1].name);
    userEvent.click(nextBtn);
    expect(pokemon.textContent).toBe(pokemons[2].name);
  });

  it('Verifica se apenas um pokemon é exibido na tela', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonName).toHaveLength(1);
  });

  it('Verfica se existem filtros ', () => {
    renderWithRouter(<App />);
    const filters = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const btn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByText(/All/);
    btn.forEach((button, index) => expect(button).toHaveTextContent(filters[index]));
    expect(allBtn).toBeInTheDocument();
  });

  it('Testa se tem um botao que reseta o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByText(/All/);
    expect(allBtn).toBeInTheDocument();
    const nextBtn = screen.getByText(/Próximo pokémon/);
    expect(nextBtn).toBeInTheDocument();
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(nextBtn);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(pikachu).toBeInTheDocument();
  });
});
