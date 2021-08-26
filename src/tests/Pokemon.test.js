// test('', () => {});
import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

const details = 'More details';
describe('<Pokemon /> Section Tests', () => {
  const informations = {
    name: 'Pikachu',
    type: 'Electric',
    weight: 'Average weight: 6.0 kg',
    pokemonImage: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    pokemonAlt: 'Pikachu sprite',
    url: '/pokemons/25',
    urlText: details,
    starImage: '/star-icon.svg',
    starAlt: 'Pikachu is marked as favorite',
  };

  afterEach(cleanup);

  it('should contain the right informations in pokemon card', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img');
    const alt = screen.getByAltText(/sprite/i);
    const href = screen.getByText(details);

    expect(name.textContent).toStrictEqual(informations.name);
    expect(type.textContent).toStrictEqual(informations.type);
    expect(weight.textContent).toStrictEqual(informations.weight);
    expect(href).toBeInTheDocument();
    expect(href.textContent).toStrictEqual(informations.urlText);
    expect(image.src).toStrictEqual(informations.pokemonImage);
    expect(alt).toBeInTheDocument();
  });

  it('redirect and go details page and see if is favorited', () => {
    const { history } = renderWithRouter(<App />);
    const href = screen.getByText(details);
    userEvent.click(href);
    const pikachuDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(informations.url);
  });

  it('check star icon', () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const starIcon = screen.getByAltText(informations.starAlt);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.alt).toStrictEqual(informations.starAlt);
    expect(starIcon.src).toMatch(informations.starImage);
  });

  /*  it('see if is all corretcly in favorited pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const href = screen.getByText('Favorite Pokémons');
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img');
    const alt = screen.getByAltText(/sprite/i);
    userEvent.click(href);

    const pikachuDetails = screen.getByRole('heading', { name: /favorite pokemons/i, level: 2 });
    expect(pikachuDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
    expect(name.textContent).toStrictEqual(informations.name);
    expect(type.textContent).toStrictEqual(informations.type);
    expect(weight.textContent).toStrictEqual(informations.weight);
    expect(name.textContent).toStrictEqual(informations.name);
    expect(href).toBeInTheDocument();
    expect(href.textContent).toStrictEqual(informations.urlText);
    expect(image.src).toStrictEqual(informations.pokemonImage);
    expect(alt).toBeInTheDocument();
  }); */
});

/*
Teste se é renderizado um card com as informações de determinado pokémon.

O nome correto do Pokémon deve ser mostrado na tela;

O tipo correto do pokémon deve ser mostrado na tela.

O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.

A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;

Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;

Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.

Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;

Teste se existe um ícone de estrela nos Pokémons favoritados.

O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;

A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.

*/
