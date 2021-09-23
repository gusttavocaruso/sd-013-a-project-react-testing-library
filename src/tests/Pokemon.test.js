import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Requisito 6: texte do componente Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );
  });

  it('Requisito 6.1.1: O nome correto do Pokémon deve ser mostrado na tela', () => {
    /** ======== acessando o elemento ========= */
    const pokemonName = screen.getByText(pokemons[0].name);

    /** ======== testando os elementos ========= */
    expect(pokemonName).toBeInTheDocument();
  });

  it('Requisito 6.1.2: O tipo correto deve ser mostrado na tela', () => {
    /** ======== acessando o elemento ========= */
    const pokemonType = screen.getByTestId('pokemon-type');

    /** ======== testando os elementos ========= */
    expect(pokemonType.textContent).toStrictEqual(pokemons[0].type);
  });

  it('Requisito 6.1.3:O peso médio do pokémon deve ser exibido', () => {
    /** ======== acessando o elemento ========= */
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const weight = pokemons[0].averageWeight.value;
    const unitWeight = pokemons[0].averageWeight.measurementUnit;
    const referenceWeight = `Average weight: ${weight} ${unitWeight}`;

    /** ======== testando os elementos ========= */
    expect(pokemonWeight.textContent).toStrictEqual(referenceWeight);
  });

  it('Requisito 6.1.4:A imagem do Pokémon deve ser exibida.', () => {
    /** ======== acessando o elemento ========= */
    const pokemonImg = screen.getByAltText(/sprite/i);
    const referenceAlt = `${pokemons[0].name} sprite`;

    /** ======== testando os elementos ========= */
    expect(pokemonImg.src).toStrictEqual(pokemons[0].image);
    expect(pokemonImg.alt).toStrictEqual(referenceAlt);
  });

  it('Requisito 6.2 a 6.4: Teste do link de navegação para detalhes.', () => {
    cleanup();
    const { history } = renderWithRouter(<App />);
    /** ======== acessando o elemento ========= */
    const detailsButton = screen.queryByRole('link', { name: 'More details' });
    const referenceButton = `/pokemons/${pokemons[0].id}`;

    /** ======== interagindo com os elementos ========= */
    userEvent.click(detailsButton);
    const { pathname } = history.location;

    /** ======== testando os elementos ========= */
    expect(pathname).toStrictEqual(referenceButton);
  });

  it('Requisito 6.5: Teste se existe um ícone de favoritados.', () => {
    /** ======== acessando o elemento ========= */
    const star = screen.queryByRole('img', { name: /marked as favorite/i });
    const starReference = `${pokemons[0].name} is marked as favorite`;

    /** ======== testando os elementos ========= */
    expect(star.src).toMatch('/star-icon.svg');
    expect(star.alt).toStrictEqual(starReference);
  });
});
