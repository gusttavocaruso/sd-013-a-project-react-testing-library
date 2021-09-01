import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('Testa component Pokemon', () => {
  const idPokemon = pokemons[0].id;
  const nomePokemon = pokemons[0].name;
  const tipoPokemon = pokemons[0].type;
  const pesoPokemonValor = pokemons[0].averageWeight.value;
  const pesoPokemonUnd = pokemons[0].averageWeight.measurementUnit;
  const imagemPokemon = pokemons[0].image;

  it('Testa se mostra o nome correto do pokemon', () => {
    const nome = screen.getByTestId('pokemon-name');

    expect(nome).toHaveTextContent(nomePokemon);
  });

  it('Testa se mostra o tipo correto do pokemon', () => {
    const tipo = screen.getByTestId('pokemon-type');

    expect(tipo).toHaveTextContent(tipoPokemon);
  });

  it('Testa se mostra o peso do pokemon corretamente', () => {
    const peso = screen.getByTestId('pokemon-weight');

    expect(peso)
      .toHaveTextContent(`Average weight: ${pesoPokemonValor} ${pesoPokemonUnd}`);
  });

  it('Testa se mostra a imagem corretamente', () => {
    const imagem = screen.getByAltText(/sprite/i);

    expect(imagem).toHaveAttribute('src', imagemPokemon);

    expect(imagem).toHaveAttribute('alt', `${nomePokemon} sprite`);
  });

  it('Testa se o card do Pokémon contém um link para exibir detalhes', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    expect(detalhes).toHaveAttribute('href', `/pokemons/${idPokemon}`);
  });

  it('Testa se ao clicar no link, é feito o redirecionamento para detalhes', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const time = 1000;
    setTimeout(() => {
      expect(window.location.pathname).toBe(`/pokemons/${idPokemon}`);
    }, time);

    const tituloDetalhes = screen.getByRole('heading', { name: /details/i });

    expect(tituloDetalhes).toHaveTextContent(`${nomePokemon} Details`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const favoritar = screen.getByLabelText(/Pokémon favoritado?/i);

    userEvent.click(favoritar);

    const iconeFavoritado = screen.getByAltText(`${nomePokemon} is marked as favorite`);

    expect(iconeFavoritado).toBeInTheDocument();
  });

  it('Testa se o ícone é uma imagem com os atributos corretos', () => {
    const detalhes = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detalhes);

    const favoritar = screen.getByLabelText(/Pokémon favoritado?/i);

    userEvent.click(favoritar);
    userEvent.click(favoritar);

    const iconeFavoritado = screen.getByAltText(/is marked as favorite/i);

    expect(iconeFavoritado).toHaveAttribute('src', '/star-icon.svg');
  });
});

// 6. Teste o componente <Pokemon.js />
// Teste se é renderizado um card com as informações de determinado pokémon.
// O nome correto do Pokémon deve ser mostrado na tela;
// O tipo correto do pokémon deve ser mostrado na tela.
// O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
// A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
// Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
// Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.
// Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;
// Teste se existe um ícone de estrela nos Pokémons favoritados.
// O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
// A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
// O que será verificado:
// Será avaliado se o arquivo teste Pokemon.test.js contemplam 100% dos casos de uso criados pelo Stryker.
