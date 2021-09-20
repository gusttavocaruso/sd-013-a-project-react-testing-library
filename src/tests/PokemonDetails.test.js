import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa se o componente PokemonDetails rendeiza corretamente', () => {
  const detalhes = 'More details';
  const pikachu = pokemons[0];
  const fav = 'Pokémon favoritado?';
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se as informações detalhadas do Pokémon selecionado '
  + 'são mostradas na tela.', () => {
    const details = screen.getByText(detalhes);
    fireEvent.click(screen.getByText(detalhes));

    const h2Details = screen.getByText(`${pikachu.name} Details`);
    expect(h2Details).toBeInTheDocument();

    const h2Summary = screen.getByText('Summary');
    expect(h2Summary).toBeInTheDocument();

    const p = screen.getByText(`${pikachu.summary}`);
    expect(p).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();
  });

  it('Verifica se existe na página uma seção com os mapas '
  + 'contendo as localizações do pokémon', () => {
    fireEvent.click(screen.getByText(detalhes));

    const h2 = screen.getByText(`Game Locations of ${pikachu.name}`);
    expect(h2).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps).toHaveLength(2);

    const [map1, map2] = maps;
    expect(map1.src).toStrictEqual(pikachu.foundAt[0].map);
    expect(map2.src).toStrictEqual(pikachu.foundAt[1].map);

    const location1 = screen.getByText(pikachu.foundAt[0].location);
    expect(location1).toBeInTheDocument();
    const location2 = screen.getByText(pikachu.foundAt[1].location);
    expect(location2).toBeInTheDocument();
  });

  it('Verifica se o usuário pode favoritar um pokémon '
+ 'através da página de detalhes.', () => {
    fireEvent.click(screen.getByText(detalhes));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    expect(screen.getByText(fav)).toBeInTheDocument();
    fireEvent.click(screen.getByText(fav));

    const star = screen.getByAltText(`${pikachu.name} is marked as favorite`);
    expect(star).toBeInTheDocument();

    fireEvent.click(screen.getByText(fav));
    expect(star).not.toBeInTheDocument();
  });
});
