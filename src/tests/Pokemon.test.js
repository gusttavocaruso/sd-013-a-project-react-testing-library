import React from 'react';
import { screen, userEvent, cleanup } from './index';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Teste o componente <Pokemon.js />', () => {
  afterEach(cleanup);
  it('Teste se é renderizado um card', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');
    const alt = screen.getByAltText(/sprite/i);
    const href = screen.getByText(/details/i);

    const weightInfo = 'Average weight: 6.0 kg';

    expect(pokeName.textContent).toStrictEqual(pokemons[0].name);
    expect(pokeType.textContent).toStrictEqual(pokemons[0].type);
    expect(pokeWeight.textContent).toStrictEqual(weightInfo);
    expect(pokeImg.src).toStrictEqual(pokemons[0].image);
    expect(alt).toBeInTheDocument();
    expect(href).toBeInTheDocument();
    expect(href.textContent).toStrictEqual('More details');
  });

  it('Verifica link de navegação /pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const href = screen.getByText(/details/i);
    userEvent.click(href);
    const heading = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2 });

    expect(heading).toBeInTheDocument();
    expect(history.location.pathname).toStrictEqual('/pokemons/25');
  });

  it('Star Icon', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ pokemons[0] } />);

    // const checkbox = screen.getByRole('checkbox');
    // userEvent.click(checkbox);
    // const checkStar = screen.getByAltText('Pikachu is marked as favorite');
    // expect(checkStar).toBeInTheDocument();
    // expect(checkstar.src).toStrictEqual('/star-icon.svg');
    // expect(checkStar.alt).toStrictEqual('Pikachu is marked as favorite');

    const favIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    // Verifico que ela dá match com a src desejada
    expect(favIcon.src).toMatch(/star-icon.svg/i);
    // Verifico que ela possui o alt text desejado
    expect(favIcon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
