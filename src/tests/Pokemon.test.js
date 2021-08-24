import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(' Teste o componente <Pokemon.js /> (req6)', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    // Acessa os elementos da tela
    renderWithRouter(<App />);
    // Pegando os elemntos pelo "data-id"
    const pokemonName = (screen.getByTestId('pokemon-name')).innerHTML;
    const pokemonType = (screen.getByTestId('pokemon-type')).innerHTML;
    const pokemonWeight = (screen.getByTestId('pokemon-weight')).innerHTML;

    // Verifico se o valor é o esperado em cada variável
    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');

    // Pegando a imagem do pokemon
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    // teste se a imagem está no documento e se o valor do src é o esperado
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src)
      .toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se tem um link de navegação para exibir detalhes', () => {
    // Acessa os elementos da tela
    const { history } = renderWithRouter(<App />);

    // Pegando o link de "MoreDetails" e testando se está no documento
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();

    // Clicando no link "MoreDetails"
    fireEvent.click(linkDetails);

    // Pegando a rota do link "MoreDetails" e testando se o valor é o esperado
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se é feito o redirecionamento para a página de "MoreDetails"', () => {
    // Acessa os elementos da tela
    const { history } = renderWithRouter(<App />);

    // Pegando o link de "MoreDetails" e testando se está no documento
    const linkDetails = screen.getByRole('link', { name: /More details/i });

    // Clicando no link "MoreDetails"
    fireEvent.click(linkDetails);

    const { pathname } = history.location;

    // Conferindo se o título h2 é da página de "MoreDetails" e testando se está no documento
    const h2Heading = screen.getByRole('heading',
      { name: /Details/i,
        level: 2 });

    expect(h2Heading).toBeInTheDocument();
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    // Encontra o elemento "mais detalhes e clica nele"
    const moreDetails = screen.getByText(/More Details/i);
    fireEvent.click(moreDetails);

    // Encontra a checkbox para "favoritar" o Pokemon e clica nela
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favorite);

    // Encontra o link para a Home e clica nele.
    const home = screen.getByText(/Home/i);
    fireEvent.click(home);

    // Encontra a "estrela" que marca o pokemon como favorito
    const starImage = screen.getByAltText(/is marked as favorite/i);

    // Testa se a imagem está no documento e se o src contém o caminho "/star-icon.svg"
    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toContain('/star-icon.svg');
  });
});
