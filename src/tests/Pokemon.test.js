import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

// Código feito com a ajuda de Felipe Neves
describe('Teste o componente <Pokemon.js />', () => {
  const { id } = pokemons[0];
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonPikachu = screen.getByText('Pikachu');
    expect(pokemonPikachu).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonPeso = screen.getByTestId('pokemon-weight');
    expect(pokemonPeso).toHaveTextContent(/6.0 kg/i);

    const pokemonImagem = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonImagem.src).toBe(url);
    expect(pokemonImagem).toBeInTheDocument();
  });

  test('Se o id do pokemon indicado esta no link de navagação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkSobre = screen.getByText('More details');
    expect(linkSobre).toBeInTheDocument();

    userEvent.click(linkSobre);

    const { location: { pathname } } = history;

    expect(pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { name } = pokemons[0];
  test('O ícone deve ser uma imagem "/sta-icon.svg"', () => {
    renderWithRouter(<App />);

    const linkDeails = screen.getByText(/more details/i);
    userEvent.click(linkDeails);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);

    const url = 'http://localhost/star-icon.svg';
    const imagem = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(imagem.src).toBe(url);
  });
});
