import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const withRenderJosueAproves = (component) => {
  const history = createMemoryHistory();
  return { ...render(
    <Router history={ history }>
      {component}
    </Router>,
  ),
  history };
};

const isFavorite = false;
const pokemon = pokemons[0];

beforeEach(() => {
  withRenderJosueAproves(
    <Pokemon isFavorite={ isFavorite } pokemon={ pokemon } />,
  );
});

describe('Teste o componente "<Pokemon.js />"', () => {
  describe('Teste se é renderizado um card com as informações de determinado'
  + ' pokémon.', () => {
    it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);
    });

    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(pokemon.type);
    });

    it('O peso médio do pokémon deve ser exibido com um texto no formato Average weight:'
    + ' <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente,'
    + ' o peso médio do pokémon e sua unidade de medida.', () => {
      const averageWeight = screen.getByTestId('pokemon-weight');
      expect(averageWeight).toHaveTextContent(pokemon.averageWeight.value);
      expect(averageWeight).toHaveTextContent(pokemon.averageWeight.measurementUnit);
    });

    it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL'
    + ' da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do'
    + ' pokémon.', () => {
      const expected = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      const imagePokemon = screen.getByAltText(`${pokemon.name} sprite`);
      expect(imagePokemon.getAttribute('src')).toBe(expected);
    });
  });

  describe('Teste o card do Pokémon.', () => {
    it('Contém um link de navegação para exibir detalhes deste Pokémon.O link deve'
    + ' possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido.', () => {
      const expected = `/pokemons/${pokemon.id}`;
      const mareDetails = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(mareDetails.getAttribute('href')).toBe(expected);
    });
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    it('O ícone deve ser uma imagem com o atributo src contendo o caminho'
  + ' /star-icon.svg;', () => {
      withRenderJosueAproves(
        <Pokemon isFavorite pokemon={ pokemon } />,
      );
      const startFavorite = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(startFavorite.getAttribute('src')).toBe('/star-icon.svg');
    });
    it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,'
    + ' onde <pokemon> é o nome do Pokémon exibido.', () => {

    });
  });
});
