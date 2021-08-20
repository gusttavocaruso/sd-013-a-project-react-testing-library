import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste Pokemon.js', () => {
  test('link de navegação para exibir detalhes deste Pokémon. ', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    // test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon. ', () => {});
    userEvent.click(moreDetails);

    // test('Teste também se a URL exibida no navegador muda para `/pokemon/<id>`, onde `<id>` é o id do Pokémon cujos detalhes se deseja ver', () => {});
    expect(history.location.pathname).toEqual('/pokemons/25');

    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);

    const pikachuFavorite = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(pikachuFavorite).toBeInTheDocument();

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritePokemon);

    expect(history.location.pathname).toEqual('/favorites');

    const pikachu = screen.getByTestId('pokemon-name');

    //   test('O nome correto do Pokémon deve ser mostrado na tela;', () => {});
    expect(pikachu).toBeInTheDocument();
    //   test('A imagem deve ter o atributo `alt` igual a `<pokemon> is marked as favorite`, onde `<pokemon>` é o nome do Pokémon exibido.', () => {});
    // test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {});
    //   test('O ícone deve ser uma imagem com o atributo `src` contendo o caminho `/star-icon.svg`', () => {});
    const starFavorite = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
    //   test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo `src` com a URL da imagem e um atributo `alt` com o texto `<name> sprite`, onde `<name>', () => {});

    const pikachuSprite = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    // test('O peso médio do pokémon deve ser exibido com um texto no formato `Average weight: <value> <measurementUnit>`; onde `<value>` e `<measurementUnit>` são, respectivamente, o peso médio do pokémon e sua unidade de medida.', () => {});
    const pikachuWeight = screen.getByTestId('pokemon-weight');
    expect(pikachuWeight).toHaveTextContent('Average weight');
    expect(pikachuWeight).toHaveTextContent('kg');

    // test('O tipo correto do pokémon deve ser mostrado na tela.', () => {});
    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent('Electric');
  });
});
