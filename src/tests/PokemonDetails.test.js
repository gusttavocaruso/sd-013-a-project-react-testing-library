import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import PokemonDetails from '../components/PokemonDetails';
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

const match = { params: { id: '25' } };
const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const onUpdateFavoritePokemons = () => {};
beforeEach(() => {
  withRenderJosueAproves(
    <PokemonDetails
      match={ match }
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
    />,
  );
});

describe('Teste o componente "<PokemonDetails.js />"', () => {
  describe('Teste se as informações detalhadas do Pokémon selecionado são'
  + ' mostradas na tela.', () => {
    it('A página deve conter um texto "<name> Details", onde "<name>" é o nome do'
    + ' Pokémon', () => {
      const pokemonDetails = screen.getByRole('heading', {
        level: 2,
        name: `${pokemons[0].name} Details`,
      });
      expect(pokemonDetails).toHaveTextContent(`${pokemons[0].name} Details`);
    });
    it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
      () => {
        const moreDetails = screen.queryByRole('link', {
          name: /more details/i,
        });
        expect(moreDetails).toBeNull();
      });
    it('A seção de detalhes deve conter um heading "h2" com o texto "Summary".', () => {
      const summary = screen.getByRole('heading', {
        level: 2,
        name: /summary/i,
      });
      expect(summary).toHaveTextContent('Summary');
    });
    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico'
    + ' sendo visualizado.', () => {

    });
  });
  describe('Teste se existe na página uma seção com os mapas contendo as localizações'
  + 'do pokémon', () => {
    it('Na seção de detalhes deverá existir um heading "h2" com o texto "Game Locations '
    + 'of <name>"; onde "<name>" é o nome do Pokémon exibido.', () => {

    });
    it('Todas as localizações do Pokémon devem ser mostradas na seção de'
    + ' detalhes.', () => {

    });
    it('Devem ser exibidos, o nome da localização e uma imagem do mapa em cada'
    + ' localização;', () => {

    });
    it('A imagem da localização deve ter um atributo "src" com a URL da'
    + ' localização;', () => {

    });
    it('A imagem da localização deve ter um atributo "alt" com o texto "<name>'
    + ' location", onde "<name>" é o nome do Pokémon;', () => {

    });
  });

  describe('Teste se o usuário pode favoritar um pokémon através da página de'
  + ' detalhes.', () => {
    it('A página deve exibir um "checkbox" que permite favoritar o Pokémon.', () => {

    });
    it('Cliques alternados no "checkbox" devem adicionar e remover respectivamente o'
    + ' Pokémon da lista de favoritos.', () => {

    });
    it('O "label" do "checkbox" deve conter o texto "Pokémon favoritado?".', () => {

    });
  });
});
