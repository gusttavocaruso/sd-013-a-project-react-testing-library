import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

describe('Testando o componente About', () => {
  it(' Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const imgPokemon = screen.getByRole('img');

    expect(name.innerHTML).toBe('Pikachu');
    expect(type.innerHTML).toBe('Electric');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se o card tem um link', () => {
    renderWithRouter(<App />);
    const linkCard = screen.getByRole('link', { name: /More details/i });

    expect(linkCard).toBeInTheDocument();
    expect(linkCard).toHaveTextContent('More details');
  });

  it('Clicar no link de navegação, redireciona para a página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const pikachuDetails = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(pikachuDetails).toBeInTheDocument();
  });

  test('Teste se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${Pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela', () => {
    renderWithRouter(<Pokemon pokemon={ Pokemons[0] } isFavorite />);

    const favoritePoke = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePoke).toBeInTheDocument();
    expect(favoritePoke).toHaveAttribute('src', '/star-icon.svg');
  });
});
