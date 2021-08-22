import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import Pokemons from '../data';

describe('teste o component Pokedex.js', () => {
  it('teste se há um h2 com o texto "Encountered pokémons"', () => {
    // so passa se renderizar o <App /> (?)
    renderWithRouter(<App />);
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
    renderWithRouter(<App />);
    // a partir do codigo da Aline Hoshino.
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
    // const dragonair = screen.getByText('Dragonair');
    // expect(dragonair).toBeInTheDocument();
    // const pikachu = screen.getByText(/pikachu/i);
    // userEvent.click(lestButton);
    // expect(pikachu).toBeInTheDocument();
    // expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
  it('testa se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);
    const allThePokemons = screen.getAllByTestId(/pokemon-name/i);
    expect(allThePokemons).toHaveLength(1);
  });
  it('Os botão, devem existir e corresponder ao nome do tipo do pokémon', () => {
    renderWithRouter(<App />);
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(buttonElectric);
    const type = screen.getAllByText(/Electric/i);
    expect(type.innerText).toBe(buttonElectric.innerText);
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(buttonFire);
    const typeFire = screen.getAllByText(/Fire/i);
    expect(typeFire.innerText).toBe(buttonFire.innerText);
    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(buttonBug);
    const typeBug = screen.getAllByText(/Bug/i);
    expect(typeBug.innerText).toBe(buttonBug.innerText);
    const buttonPoison = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(buttonPoison);
    const typePoison = screen.getAllByText(/Poison/i);
    expect(typePoison.innerText).toBe(buttonPoison.innerText);
    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(buttonPsychic);
    const typePsychic = screen.getAllByText(/Psychic/i);
    expect(typePsychic.innerText).toBe(buttonPsychic.innerText);
    const buttonNormal = screen.getByRole('button', { name: 'Normal' });
    userEvent.click(buttonNormal);
    const typeNormal = screen.getAllByText(/Normal/i);
    expect(typeNormal.innerText).toBe(buttonNormal.innerText);
    const buttonDragon = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(buttonDragon);
    const typeDragon = screen.getAllByText(/Normal/i);
    expect(typeDragon.innerText).toBe(buttonDragon.innerText);
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
    // const allPokemons = Pokemons.map((pokemon) => pokemon.index);
    // allPokemons.forEach((pokemon, index) => {
    //   // pokemonIndex = pokemon;
    //   userEvent.click(buttonProximoPokemon);
    //   expect(allPokemons).tobe(pokemon.index[8]);
    // });
    // userEvent.click(buttonProximoPokemon);
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
});
