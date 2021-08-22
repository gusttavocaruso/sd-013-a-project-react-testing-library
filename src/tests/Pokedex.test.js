import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste o component Pokedex.js', () => {
  it('teste se há um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />); // so passa se renderizar o <App /> (?)
    const h2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      classe: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Se é exibido o próximo Pokemon. botão conter o texto "próximo pokémon"', () => {
    renderWithRouter(<App />);
    const proximoPokemon = 'Próximo pokémon';
    const buttonNext = screen.getByRole('button', { name: proximoPokemon });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: proximoPokemon }));
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
  it('o 1º pokémon da lista deve ser mostrado ao clicar no ultimo da lista', () => {
    renderWithRouter(<App />); // a partir do codigo da Aline Hoshino.
    const lestButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(lestButton).toBeInTheDocument();
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(lestButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(lestButton);
    const Caterpie = screen.getByText(/Caterpie/i);
    expect(Caterpie).toBeInTheDocument();
    userEvent.click(lestButton);
    const Ekans = screen.getByText(/Ekans/i);
    expect(Ekans).toBeInTheDocument();
    userEvent.click(lestButton);
    const Alakazam = screen.getByText(/Alakazam/i);
    expect(Alakazam).toBeInTheDocument();
    userEvent.click(lestButton);
    const Mew = screen.getByText(/Mew/i);
    expect(Mew).toBeInTheDocument();
    userEvent.click(lestButton);
    const Rapidash = screen.getByText(/Rapidash/i);
    expect(Rapidash).toBeInTheDocument();
    userEvent.click(lestButton);
    const Snorlax = screen.getByText(/Snorlax/i);
    expect(Snorlax).toBeInTheDocument();
    userEvent.click(lestButton);
    const Dragonair = screen.getByText(/Dragonair/i);
    expect(Dragonair).toBeInTheDocument();
    userEvent.click(lestButton);
    const PikachuReestart = screen.getByText(/Pikachu/i);
    expect(PikachuReestart).toBeInTheDocument();
  });
  it('testa se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />); // a partir do cod. de Aline Hoshino
    const allThePokemons = screen.getAllByTestId(/pokemon-name/i);
    expect(allThePokemons).toHaveLength(1);
  });
  it('Os botão, devem existir e corresponder ao nome do tipo do pokémon', () => {
    renderWithRouter(<App />);
    const buttonTypeElectric = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    const typePokemonElectric = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonElectric.innerText).toBe(buttonTypeElectric.innerText);
    const buttonTypeFire = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    const typePokemonFire = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonFire.innerText).toBe(buttonTypeFire.innerText);
    const buttonTypeBug = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    expect(buttonBug).toBeInTheDocument();
    userEvent.click(buttonBug);
    const typePokemonBug = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonBug.innerText).toBe(buttonTypeBug.innerText);
    const buttonTypePoison = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonPoison = screen.getByRole('button', { name: 'Poison' });
    expect(buttonPoison).toBeInTheDocument();
    userEvent.click(buttonPoison);
    const typePokemonPoison = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonPoison.innerText).toBe(buttonTypePoison.innerText);
    const buttonTypePsychic = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    const typePokemonPsychic = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonPsychic.innerText).toBe(buttonTypePsychic.innerText);
    const buttonTypeNormal = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonNormal = screen.getByRole('button', { name: 'Normal' });
    expect(buttonNormal).toBeInTheDocument();
    userEvent.click(buttonNormal);
    const typePokemonNormal = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonNormal.innerText).toBe(buttonTypeNormal.innerText);
    const buttonTypeDragon = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonDragon = screen.getByRole('button', { name: 'Dragon' });
    expect(buttonDragon).toBeInTheDocument();
    userEvent.click(buttonDragon);
    const typePokemonDragon = screen.getAllByTestId(/pokemon-type/i);
    expect(typePokemonDragon.innerText).toBe(buttonTypeDragon.innerText);
  });
  it('botão All sempre visivel', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  it('botão All sem filtro', () => {
    renderWithRouter(<App />);
    const buttonProximoPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(buttonProximoPokemon).toBeInTheDocument();
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Caterpie = screen.getByText(/Caterpie/i);
    expect(Caterpie).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Ekans = screen.getByText(/Ekans/i);
    expect(Ekans).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Alakazam = screen.getByText(/Alakazam/i);
    expect(Alakazam).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Mew = screen.getByText(/Mew/i);
    expect(Mew).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Rapidash = screen.getByText(/Rapidash/i);
    expect(Rapidash).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Snorlax = screen.getByText(/Snorlax/i);
    expect(Snorlax).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const Dragonair = screen.getByText(/Dragonair/i);
    expect(Dragonair).toBeInTheDocument();
    userEvent.click(buttonProximoPokemon);
    const PikachuReestart = screen.getByText(/Pikachu/i);
    expect(PikachuReestart).toBeInTheDocument();
  });
  it('Ao carregar a página, o filtro selecionado deverá ser botão All', () => {
    renderWithRouter(<App />);
    const All = screen.getByRole('button', { name: /All/i });
    expect(All).toBeInTheDocument();
    userEvent.click(All);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
