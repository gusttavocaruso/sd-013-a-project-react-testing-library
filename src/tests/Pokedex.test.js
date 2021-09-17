import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex />', () => {
  it('exibe na tela a mensagem', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByText(/Encountered pokémons/i);
    expect(encountered).toBeInTheDocument();
  });

  it('testa se existe o botão Next e se muda para próximo pokemon', () => {
    renderWithRouter(<App />);
    const getButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(getButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const getPokemonName = screen.getByTestId('pokemon-name');
      expect(getPokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(getButton);
    });
  });

  it('testa se é mostrado um pokemon por vez', () => {
    renderWithRouter(<App />);
    const getPokemonByTestId = screen.getAllByTestId('pokemon-name');
    expect(getPokemonByTestId.length).toBe(1);
  });

  it('testa os botões de filtro', () => {
    renderWithRouter(<App />);
    const quantidadeDeBotoes = 7;
    const getButtons = screen.getAllByTestId('pokemon-type-button');
    getButtons.forEach((item) => expect(item).toBeInTheDocument());
    expect(getButtons).toHaveLength(quantidadeDeBotoes);
  });

  it('testa se funciona a seleção', () => {
    renderWithRouter(<App />);
    const botaoFiltro = screen.getAllByTestId('pokemon-type-button');
    const ativar = botaoFiltro.find((button) => button.innerHTML === 'Fire');
    userEvent.click(ativar);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
    const botaoNext = screen.getByTestId('next-pokemon');
    userEvent.click(botaoNext);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
  });

  it('testa se existe o botão all', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('testa se a pokedex contém um botão pra remover filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const noFilter = screen.getByText('Pikachu');
    userEvent.click(buttonAll);
    expect(noFilter).toBeInTheDocument();
  });
});
