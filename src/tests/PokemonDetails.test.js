import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 - Verificando funcionamento do '
 + 'componente <PokemonDetails />', () => {
  it('Verirfica se as informações detalhadas do Pokémon'
    + ' selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    // Verifica que existe o link para detalhes, e clica no link
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(linkDetails);

    // Verifica que o H2 da página é 'Pikachu Details'
    const titleH2 = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(titleH2).toBeInTheDocument();

    // Dentro de details o link para lá não pode existir
    expect(linkDetails).not.toBeInTheDocument();

    // Espera-se que o título do sumário exista nesta página
    const summaryH2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryH2).toBeInTheDocument();

    // Espera-se que o texto sumário do pikachu esteja nesta página
    const pInfo = screen.getByText(`${pokemons[0].summary}`);
    expect(pInfo).toBeInTheDocument();
  });

  it('Verirfica se existe na página uma seção'
    + ' com os mapas contendo as localizações do pokémon.', () => {
    renderWithRouter(<App />);

    // Vamos novamente acessar os detalhes do pikachu
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);

    // Verificamos que existe o H2 com o título 'Game Locations of Pikachu'
    const locations = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Pikachu',
      });

    expect(locations).toBeInTheDocument();

    // Pegamos o alt text de todos os mapas do pikachu e atribuimos a esta const
    const maps = screen.getAllByAltText('Pikachu location');

    // Verificamos que o número de mapas é igual ao número de lugares onde o pikachu é encontrado em pokemons.foundAt
    expect(maps.length).toBe(pokemons[0].foundAt.length);

    // Para cada imagem de maps (que seriam 2 no caso) esperamos ter um src respectivo que estaria na chave .map de foundAt. em data.js
    maps.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    });
  });

  it('Verirfica se o usuário pode favoritar um pokémon'
    + ' através da página de detalhes.', () => {
    renderWithRouter(<App />);

    // Acionamos o more details
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);

    // Verificamos que existia o elemento input do tipo checkbox
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    // Verificamos que a label existia com o testo 'Pokémon favoritado?'
    const checkboxlabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxlabel).toBeInTheDocument();

    // Clicamos no checkbox;
    fireEvent.click(checkbox);

    // Verificamos que o pokemon foi favoritado;
    const favoritado = screen.getByAltText(/is marked as favorite/i);
    expect(favoritado).toBeInTheDocument();

    // Clicamos de novo no checkbox
    fireEvent.click(checkbox);

    // Verificamos que o pokemon foi desfavoritado
    expect(favoritado).not.toBeInTheDocument();
  });
});
