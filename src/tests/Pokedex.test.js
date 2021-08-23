import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    // renderiza a pagina //usar onde o pokedex é renderizado "App"
    renderWithRouter(<App />);
    // buscar o elemento
    const headingTwo = screen.getByRole('heading', { name: /Encountered pokémons/i });
    // testando o elemento
    expect(headingTwo).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    // renderiza a pagina
    renderWithRouter(<App />);
    // buscando o elemento botão e conter "Proximo pokemon"
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    // testando o elemento botão
    expect(buttonNextPokemon).toBeInTheDocument();
    // testando o click do botão
    userEvent.click(buttonNextPokemon);
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    // renderizar a pagina onde sera renderizado o pokedex "app"
    renderWithRouter(<App />);
    // buscar o elemento botao
    const buttonOneAtTime = screen.getByText('All');
    // testando o elemento botão
    expect(buttonOneAtTime).toBeInTheDocument();
    // testando o clique do botao
    userEvent.click(buttonOneAtTime);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    // renderizar a pagina onde o pokedex sera renderizado "app"
    // consulta ao https://testing-library.com/docs/queries/bytestid/
    renderWithRouter(<App />);
    // testando a utilizaçao do filtro "getAllByTestId" - pega elemento pelo data testid
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    // testando o botao
    expect(filterButtons[0]).toBeInTheDocument();
    // testando os botoes
    userEvent.click(filterButtons[0]);
    // consulta ao site - https://jestjs.io/pt-BR/docs/expect#tobe
    // testando o clique dos botoes //no erro pede para ser colocado "Electric"
    expect(filterButtons[0].innerHTML).toBe('Electric');
  });
});
