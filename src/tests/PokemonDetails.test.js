import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa PokemonDetails.js', () => {
  test('testa seção de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    expect(history.location.pathname).toEqual('/pokemons/25');
    //     - **Não** deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(moreDetails).not.toBeInTheDocument();

    // - Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
    const pikachuSprite = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const pikachuWeight = screen.getByTestId('pokemon-weight');
    expect(pikachuWeight).toHaveTextContent('Average weight');
    expect(pikachuWeight).toHaveTextContent('kg');

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent('Electric');

    //     - A página deve conter um texto `<name> Details`, onde `<name>` é o nome do Pokémon;
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toHaveTextContent('Pikachu');

    //     - A seção de detalhes deve conter um heading `h2` com o texto `Summary`.
    const summaryShow = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summaryShow).toBeInTheDocument();

    //     - A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const checkSentence = screen.getByText(/This intelligent/i);
    expect(checkSentence).toBeInTheDocument();

    //   - Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
    // const pokemonMap = screen.getB
    // pokemon-habitat

    //     - Na seção de detalhes deverá existir um heading `h2` com o texto `Game Locations of <name>`; onde `<name>` é o nome do Pokémon exibido.
    const detailsMap = screen.getByRole(
      'heading', { level: 2,
        name: /Game locations of Pikachu/i },
    );
    expect(detailsMap).toBeInTheDocument();

    //     - Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const pikachuLocation = screen.getAllByAltText(/Pikachu location/i);
    expect(pikachuLocation.length).not.toBe(1);

    //     - Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const locationName = screen.getByText(/kanto viridian forest/i);
    expect(locationName).toBeInTheDocument();

    //     - A imagem da localização deve ter um atributo `alt` com o texto `<name> location`, onde `<name>` é o nome do Pokémon;
    // const locationImage = screen.getAllByAltText(/pikachu location/i)
    // console.log(locationImage);

    // expect(locationName).toHaveAttribute('alt','Pikachu location')
    //     - A imagem da localização deve ter um atributo `src` com a URL da localização;
    const locationImage = screen.getAllByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' });
    // console.log(locationImage);
    // expect(locationImage).toBeInTheDocument()
    expect(locationImage[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    expect(history.location.pathname).toEqual('/pokemons/25');
    const favoriteDetails = screen.getByRole('checkbox');

    //     - A página deve exibir um `checkbox` que permite favoritar o Pokémon;
    const beforeClick = favoriteDetails.checked;

    userEvent.click(favoriteDetails);

    const afterClick = favoriteDetails.checked;

    expect(beforeClick).not.toEqual(afterClick);
    //   - Teste se o usuário pode favoritar um pokémon através da página de detalhes.

    const bookedFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    // console.log(bookedFavorite);
    expect(bookedFavorite).toBeInTheDocument();

    //     - Cliques alternados no `checkbox` devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(favoriteDetails);
    expect(bookedFavorite).not.toBeInTheDocument();

    //     - O `label` do `checkbox` deve conter o texto `Pokémon favoritado?`;
    const labelTest = screen.getByText(/Pokémon favoritado?/);
    expect(labelTest).toBeInTheDocument();
  });
});

// test('', () => {});
