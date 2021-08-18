import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const nextPoke = 'Próximo pokémon';

describe('Testa o componente Pokedex.js', () => {
  it('Testa se o componente tem um header com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(header).toBeInTheDocument();
  });
  it('Testa se o componente mostra todos os pokémons que deveria', () => {
    renderWithRouter(<App />);
    // Aqui eu testo se o site de fato mostra todos os pokémons que deveria, provavelmente existe uma maneira mais fácil de fazer isso, mas eu não consegui pensar em nenhuma.
    const arrPokemon = [];
    const arrPokemonLenght = 9;
    const nextPokeButton = screen.getByRole('button', { name: nextPoke });
    expect(nextPokeButton).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    arrPokemon.push(pikachu);
    fireEvent.click(nextPokeButton);
    const charmander = screen.getByText('Charmander');
    arrPokemon.push(charmander);
    fireEvent.click(nextPokeButton);
    const caterpie = screen.getByText('Caterpie');
    arrPokemon.push(caterpie);
    fireEvent.click(nextPokeButton);
    const ekans = screen.getByText('Ekans');
    arrPokemon.push(ekans);
    fireEvent.click(nextPokeButton);
    const alakazam = screen.getByText('Alakazam');
    arrPokemon.push(alakazam);
    fireEvent.click(nextPokeButton);
    const mew = screen.getByText('Mew');
    arrPokemon.push(mew);
    fireEvent.click(nextPokeButton);
    const rapidash = screen.getByText('Rapidash');
    arrPokemon.push(rapidash);
    fireEvent.click(nextPokeButton);
    const snorlax = screen.getByText('Snorlax');
    arrPokemon.push(snorlax);
    fireEvent.click(nextPokeButton);
    const dragonair = screen.getByText('Dragonair');
    arrPokemon.push(dragonair);
    fireEvent.click(nextPokeButton);
    expect(pikachu).toBeInTheDocument();
    expect(arrPokemon).toHaveLength(arrPokemonLenght);
  });
  it('Testa se apenas um pokémon aparece por vez', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });
  it('Testa os botões de selecionar o tipo do pokémon', () => {
    renderWithRouter(<App />);
    const allTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const typeButtonLength = 7;
    const nextPokeButton = screen.getByRole('button', { name: nextPoke });
    // o código das duas linhas abaixo testa se ao clicar em um tipo que só existe um pokémon, o botão de passar para o próximo pokémon é desativado.
    fireEvent.click(allTypeButtons[0]);
    expect(nextPokeButton).toHaveAttribute('disabled');
    // o código das linhas abaixo testa se cada botão salvo no meu array de botões tem um tipo especifico escrito nele.
    expect(allTypeButtons[0].innerHTML).toBe('Electric');
    expect(allTypeButtons[1].innerHTML).toBe('Fire');
    expect(allTypeButtons[2].innerHTML).toBe('Bug');
    expect(allTypeButtons[3].innerHTML).toBe('Poison');
    expect(allTypeButtons[4].innerHTML).toBe('Psychic');
    expect(allTypeButtons[5].innerHTML).toBe('Normal');
    expect(allTypeButtons[6].innerHTML).toBe('Dragon');
    // o código das linhas abaixo testa se ao clicar em um botão de um tipo, no caso o psiquico, apenas aparecerão na tela pokemons daquele tipo.
    fireEvent.click(allTypeButtons[4]);
    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(alakazam).toBeInTheDocument();
    // aqui eu testo se de fato existem 7 botões para 7 tipos diferentes.
    expect(allTypeButtons).toHaveLength(typeButtonLength);
  });
  it('Testa o botão de resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    // Tive que fazer o código abaixo novamente, porque o striker muda a função do botão All, o problema é que deixa os testes redundantes, pois ficam dois testes quase iguais.
    const arrPokemon = [];
    const arrPokemonLenght = 9;
    const nextPokeButton = screen.getByRole('button', { name: nextPoke });
    expect(nextPokeButton).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    arrPokemon.push(pikachu);
    fireEvent.click(nextPokeButton);
    const charmander = screen.getByText('Charmander');
    arrPokemon.push(charmander);
    fireEvent.click(nextPokeButton);
    const caterpie = screen.getByText('Caterpie');
    arrPokemon.push(caterpie);
    fireEvent.click(nextPokeButton);
    const ekans = screen.getByText('Ekans');
    arrPokemon.push(ekans);
    fireEvent.click(nextPokeButton);
    const alakazam = screen.getByText('Alakazam');
    arrPokemon.push(alakazam);
    fireEvent.click(nextPokeButton);
    const mew = screen.getByText('Mew');
    arrPokemon.push(mew);
    fireEvent.click(nextPokeButton);
    const rapidash = screen.getByText('Rapidash');
    arrPokemon.push(rapidash);
    fireEvent.click(nextPokeButton);
    const snorlax = screen.getByText('Snorlax');
    arrPokemon.push(snorlax);
    fireEvent.click(nextPokeButton);
    const dragonair = screen.getByText('Dragonair');
    arrPokemon.push(dragonair);
    fireEvent.click(nextPokeButton);
    expect(pikachu).toBeInTheDocument();
    expect(arrPokemon).toHaveLength(arrPokemonLenght);
  });
});
