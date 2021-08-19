import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testa todo o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2Text = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2Text).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(buttons.length).toBe(types.length);
    buttons.forEach((button, index) => expect(button).toHaveTextContent(types[index]));
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
