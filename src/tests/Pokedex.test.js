import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components';
import App from '../App';
import pokemons from '../data';

describe('5- Testa o componente Pokedex.js', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('A página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('O próximo Pokémon é exibido quando o botão Próximo pokémon é clicado.', () => {
    const pkmnName = screen.getByTestId('pokemon-name');
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemons.forEach((pokemon) => {
      expect(pkmnName).toHaveTextContent(pokemon.name);
      userEvent.click(nextBtn);
    });
    expect(pkmnName).toHaveTextContent('Pikachu');
  });
  test('É mostrado apenas um Pokémon por vez.', () => {
    const pkmnNames = screen.getAllByTestId('pokemon-name');
    expect(pkmnNames.length).toBe(1);
  });
  test('A Pokédex tem os botões de filtro por tipo.', () => {
    const pkmnTypes = [
      'Electric',
      'Fire',
      'Poison',
      'Normal',
      'Bug',
      'Dragon',
      'Psychic',
    ];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const allTypesBtn = screen.getByRole(
      'button',
      { name: /all/i },
    );
    buttons.forEach((button) => {
      expect(pkmnTypes).toContain(button.textContent);
    });
  });
  // Feito com base na resposta do Josué no Slack (https://trybecourse.slack.com/archives/C0219LZPB9N/p1629467343334700?thread_ts=1629464989.329000&cid=C0219LZPB9N)
  test('Testa se a Pokédex tem o botão All', () => {
    const getButtonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(getButtonAll);
    const getFirstPokemon = screen.getByText('Pikachu');
    expect(getFirstPokemon).toBeInTheDocument();
  });
});
