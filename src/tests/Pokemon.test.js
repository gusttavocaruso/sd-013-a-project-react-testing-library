import { screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('testa componente <pokemon />', () => {
  test('é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pysichicType = screen.getByRole('button', {
      name: /psychic/i,
    });

    fireEvent.click(pysichicType);

    const altSprite = screen.getByAltText(/alakazam sprite/i);
    const type = screen.getByTestId('pokemon-type');

    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    expect(type).toHaveTextContent('Psychic');
    expect(screen.getByText(/average weight: 48\.0 kg/i)).toBeInTheDocument();
    expect(altSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
  });

  test('o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);
    /* O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido; */

    const pysichicType = screen.getByRole('button', {
      name: /psychic/i,
    });

    fireEvent.click(pysichicType);

    const linkDetail = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkDetail).toBeInTheDocument();
    expect(linkDetail).toHaveAttribute('href', '/pokemons/65');
  });
  test('clicar no link de navegação do Pokémon, leva a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    /* O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido; */

    const pysichicType = screen.getByRole('button', {
      name: /psychic/i,
    });

    const linkDetail = screen.getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(pysichicType);
    fireEvent.click(linkDetail);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/65');
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const pysichicType = screen.getByRole('button', {
      name: /psychic/i,
    });

    const linkDetail = screen.getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(pysichicType);
    fireEvent.click(linkDetail);

    const favPokeCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    fireEvent.click(favPokeCheckbox);

    const starFav = screen.getByRole('img', {
      name: /alakazam is marked as favorite/i,
    });

    expect(starFav).toBeVisible();
    expect(starFav).toHaveAttribute('src', '/star-icon.svg');
  });
});
