import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it(`Testa se é exibido o próximo Pokémon da lista quando
      o botão Próximo pokémon é clicado`, () => {
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(nextButton);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const numberOfButtons = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(numberOfButtons);
    expect(typeButtons[1]).toHaveTextContent('Fire');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const fireButton = screen.getByRole('button', { name: /fire/i });
    fireEvent.click(fireButton);
    const allButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(allButton);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
