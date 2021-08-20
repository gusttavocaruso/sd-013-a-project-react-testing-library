import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testes da Pokedex', () => {
  it('testa se tem h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Exibir o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(nextButton);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextButton);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
    userEvent.click(nextButton);
    const ekans = screen.getByText(/Ekans/i);
    expect(ekans).toBeInTheDocument();
    userEvent.click(nextButton);
    const alakazam = screen.getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    userEvent.click(nextButton);
    const mew = screen.getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
    userEvent.click(nextButton);
    const rapidash = screen.getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();
    userEvent.click(nextButton);
    const snorlax = screen.getByText(/Snorlax/i);
    expect(snorlax).toBeInTheDocument();
    userEvent.click(nextButton);
    const dragonair = screen.getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
    userEvent.click(nextButton);
    const pikachuAgain = screen.getByText(/Pikachu/i);
    expect(pikachuAgain).toBeInTheDocument();
  });
  it('Testa se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonNames = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonNames).toHaveLength(1);
  });
  it('botões de filtro, só poke desse tipo, botão all sempre visível', () => {
    renderWithRouter(<App />);
    const TypeOfPokemon = screen.getByTestId('pokemon-type');
    const TypeButtons = screen.getAllByTestId('pokemon-type-button');
    const ButtonElectric = screen.getByRole('button',
      { name: /Electric/ });
    expect(ButtonElectric).toBeInTheDocument();
    const ButtonFire = screen.getByRole('button',
      { name: /Fire/ });
    expect(ButtonFire).toBeInTheDocument();
    const ButtonBug = screen.getByRole('button',
      { name: /Bug/ });
    expect(ButtonBug).toBeInTheDocument();
    const ButtonPoison = screen.getByRole('button',
      { name: /Poison/ });
    expect(ButtonPoison).toBeInTheDocument();
    const ButtonPsychic = screen.getByRole('button',
      { name: /Psychic/ });
    expect(ButtonPsychic).toBeInTheDocument();
    const ButtonNormal = screen.getByRole('button',
      { name: /Normal/ });
    expect(ButtonNormal).toBeInTheDocument();
    expect(ButtonNormal).toBeInTheDocument();
    const ButtonDragon = screen.getByRole('button',
      { name: /Dragon/ });
    expect(ButtonDragon).toBeInTheDocument();
    const nextButton = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    TypeButtons.forEach((TypeButton) => {
      userEvent.click(TypeButton);
      expect(TypeOfPokemon.innerText).toBe(TypeButton.innerText);
      userEvent.click(nextButton);
      expect(TypeOfPokemon.innerText).toBe(TypeButton.innerText);
    });
    const all = screen.getByText(/All/);
    expect(all).toBeInTheDocument();
  });
  it('Testa se tem um botao que reseta o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByText(/All/);
    expect(all).toBeInTheDocument();
    const nextButton = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(all);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(nextButton);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextButton);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
    userEvent.click(nextButton);
    const ekans = screen.getByText(/Ekans/i);
    expect(ekans).toBeInTheDocument();
    userEvent.click(nextButton);
    const alakazam = screen.getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    userEvent.click(nextButton);
    const mew = screen.getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
    userEvent.click(nextButton);
    const rapidash = screen.getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();
    userEvent.click(nextButton);
    const snorlax = screen.getByText(/Snorlax/i);
    expect(snorlax).toBeInTheDocument();
    userEvent.click(nextButton);
    const dragonair = screen.getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
    userEvent.click(nextButton);
    const pikachuAgain = screen.getByText(/Pikachu/i);
    expect(pikachuAgain).toBeInTheDocument();
  });
});

// Para esse teste: 'botões de filtro, só poke desse tipo, botão all sempre visível'
// primeiro testei se cada botão está na tela com seu respectivo nome.
// depois se o botao proximo está na tela também
// pelo test-id- pegou o tipo que o pokemon é - exemplo:fire
// depois pegou todos os botões por isso Allbytestid
// Usei um forEach em todos os botões para pegar só um botão por vez.
// depois comparou cada tipo do pokemon cujo texto é por exemplo fire e que seja seja igual ao texto do botao que é fire.
// então se o tipo do pokemon é bug, o texto do botao tb é bug. E assim por diante.
// depois vi se o all estava na tela.

// para o ultimo teste de resetar o filtro, vi se o botao all estava na tela e o proximo pokemon tb.
// simulei o clique no all, e a partir daí é para vir do pikachu de novo, rodar todos os poke e voltar nele.
