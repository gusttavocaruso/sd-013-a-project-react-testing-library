import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import dataPokemon from '../data';

describe('Testar o Pokemon', () => {
  test('Teste se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeith = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeith).toBeInTheDocument();

    const pokemonImg = screen.getAllByRole('img');
    expect(pokemonImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg[0]).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se o card indicado contém um link', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toHaveTextContent('More details');

    // history.push(`/pokemons/${dataPokemon[0].id}`);
    // const pikachuDetails = screen.getByRole('heading', {
    //   name: /Pikachu Details/i,
    //   level: 2,
    // });
    // expect(pikachuDetails).toBeInTheDocument();
  });

  test('Teste se ao clicar no link de navegação é feito o redirecionamento', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);
    const pikachuDetails = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(pikachuDetails).toBeInTheDocument();
  });

  test('Teste se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${dataPokemon[0].id}`);
  });

  test('Teste se existe um ícone de estrela', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);

    const favoriteCheck = screen.getByText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);

    const favoriteStar = screen.getAllByRole('img');
    expect(favoriteStar[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
