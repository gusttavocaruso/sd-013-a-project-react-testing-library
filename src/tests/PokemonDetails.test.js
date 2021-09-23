import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

/** Dei uma olhada no repositório do Gabriel Gaspar.
    Foi dele que veio a ideia de entrar em PokemonsDetails através de um click
    https://github.com/tryber/sd-013-a-project-react-testing-library/tree/gabriel-gaspar-rtl-project/src
 */

describe('Requisito 7: texte do componente PokemonDetails', () => {
  const labelText = 'Pokémon favoritado?';
  beforeEach(() => { // reseta o componente a cada iteração.
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
  });

  it('Requisito 7.1.1: A página deve conter um texto <name> Details', () => {
    /** ======== acessando o elemento ========= */
    const pokemonName = screen
      .getByRole('heading', { name: `${pokemons[0].name} Details` });

    /** ======== testando os elementos ========= */
    expect(pokemonName).toBeInTheDocument();
  });

  it('Requisito 7.1.2: Não deve existir o link de navegação para os detalhes.', () => {
    /** ======== acessando o elemento ========= */
    const detailsButton = screen.queryByRole('link', { name: 'More details' });

    /** ======== testando os elementos ========= */
    expect(detailsButton).not.toBeInTheDocument();
  });

  it('Requisito 7.1.3: Deve conter um heading h2 com o texto Summary.', () => {
    /** ======== acessando o elemento ========= */
    const h2heading = screen.getByRole('heading', { level: 2, name: 'Summary' });

    /** ======== testando os elementos ========= */
    expect(h2heading).toBeInTheDocument();
  });

  it('Requisito 7.1.5: A seção de detalhes deve conter o resumo do Pokémon', () => {
    /** ======== acessando o elemento ========= */
    const resumo = screen.getByText(/This intelligent Pokémon/);

    /** ======== testando os elementos ========= */
    expect(resumo).toBeInTheDocument();
  });

  it('Requisito 7.2.1: Deve existir um heading h2 "Game Locations of <name>"', () => {
    /** ======== acessando o elemento ========= */
    const headingh2 = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${pokemons[0].name}` });

    /** ======== testando os elementos ========= */
    expect(headingh2).toBeInTheDocument();
  });

  it('Requisito 7.2.2: Todas as localizações do Pokémon devem ser mostradas.', () => {
    /** ======== acessando o elemento ========= */
    const location = screen.getAllByAltText(`${pokemons[0].name} location`);

    /** ======== testando os elementos ========= */
    expect(location).toHaveLength(pokemons[0].foundAt.length);
  });

  it('Requisito 7.2.3 a 2.5: Nome da localização e uma imagem do mapa.', () => {
    /** ======== acessando o elemento ========= */
    const locations = screen.getAllByAltText(`${pokemons[0].name} location`);

    /** ======== testando os elementos =========
      A ideia desta lógica é do Gabriel Gaspar.
    */
    pokemons[0].foundAt.forEach((location, index) => {
      const srcMatch = locations[index].src === location.map;
      // a linha acima é true casa a url da imagem da tela seja igual a da url de ../data
      expect(srcMatch).toBeTruthy();
      const locationText = screen.getByText(location.location);
      // a linha acima busca na tela um texto igual ao encontrado na referencia em ../data
      expect(locationText).toBeInTheDocument();
    });
  });

  it('Requisito 7.3: A página deve exibir checkbox para favoritar o Pokémon.', () => {
    /** o teste a seguir contempla os três itens do 7.3
      A página deve exibir um checkbox que permite favoritar o Pokémon;
      Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
      O label do checkbox deve conter o texto Pokémon favoritado?
     */
    /** ======== acessando o elemento ========= */
    const checkbox = screen.getByLabelText(labelText);

    /** ======== interagindo e testando os elementos ========= */
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
