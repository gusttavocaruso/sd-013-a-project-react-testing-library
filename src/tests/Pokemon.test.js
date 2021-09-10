import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

describe.only('testar o componente Pokemon', () => {
  test('Renderizando o card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(
      screen.getByTestId('pokemon-weight'),
    ).toHaveTextContent('Average weight: 6.0 kg');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const alt = 'Pikachu sprite';
    expect(
      screen.getByRole('img').src,
    ).toBe(src);
    expect(
      screen.getByRole('img').alt,
    ).toBe(alt);
  });
  test('se o card do pokemon contém o link', () => {
    // referência: https://www.notion.so/Projeto-Testes-em-React-332f9886963a4491bf58da84a11f1a6b
    renderWithRouter(<App />);
    const { id } = pokemons[0];
    expect(
      screen.getByRole('link', { name: /More Details/i }).href,
    ).toBe(`http://localhost/pokemons/${id}`);
  });
  test('se existe o ícone de pokemons favoritados', () => {
    // referência do aluno vinicius Dionysio turma 13A
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
        showDetailsLink
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const nameStr = pokemonName.textContent;
    const starImg = screen.getByAltText(`${nameStr} is marked as favorite`);
    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });
});
