import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Requisito 6 - Verificando o funcionamento do componente <Pokemon />', () => {
  it('Verirfica se renderiza um card com as seguintes informações de um Pokémon:'
    + ' nome, tipo, peso médio com unidade de medida e sua imagem.', () => {
    renderWithRouter(<App />);

    // Verifico que as informações existem para um pokemon, se existe para um, existe para todos!
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  it('Verifica se o card do Pokémon contém um link para sua página de detalhes', () => {
    renderWithRouter(<App />);

    // Pego o id do primeiro pokemon do array em data.js
    const { id } = pokemons[0];

    // Pego o link 'More details' e verifico se o href dele vai para a url desejada com a id daquele pokemon;
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
  });

  it('Verifica se ao clicar no link para a página de detalhes de um Pokémon, '
    + 'é feito o redirecionamento para esta página', () => {
    // Pego o id do primeiro pokemon do array
    const { id } = pokemons[0];

    // Pego o history zerado do componente Pokemon, para o primeiro pokemon do array, quando ele não está favoritado
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    // Verifico que ao clicar no link para details, sou redirecionado de fato para a URL desejada com o id do primeiro pokemon do array
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados, '
    + 'é feito o redirecionamento para esta página', () => {
    // Renderizo o componente Pokemon, para o primeiro pokemon do array, favoritado.
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    // Pego a imagem da estrela, e verifico que ela está na tela;
    const favIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favIcon).toBeInTheDocument();

    // Verifico que ela dá match com a src desejada
    expect(favIcon.src).toMatch(/star-icon.svg/i);

    // Verifico que ela possui o alt text desejado
    expect(favIcon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
