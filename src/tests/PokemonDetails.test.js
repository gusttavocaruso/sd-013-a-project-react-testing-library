import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    history.push('pokemons/25');
    const pikachu = screen.getByText(/pikachu details/i);
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2 });
    const describe = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(describe).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizaçõe', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    history.push('pokemons/25');
    const summary = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2 });
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    const pikachuLoc = screen.getAllByAltText('Pikachu location');
    pikachuLoc.forEach((locat) => {
      expect(locat).toBeInTheDocument();
      expect(locat).toHaveAttribute('src');
      expect(locat.src.length).toBeGreaterThan(0);
    });
  });
  test('Teste se o usuário pode favoritar um pokémon através da página de detalh', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = screen.getByText('Pokémon favoritado?');
    const pokemon = screen.getByText('Pikachu');
    fireEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
    expect(pokemon).toBeInTheDocument();
    fireEvent.click(checkbox);
    history.push('/favorites');
    expect(pokemon).not.toBeInTheDocument();
    history.push('/pokemons/25');
    fireEvent.click(checkbox);
    history.push('/favorites');
    expect(pokemon).not.toBeInTheDocument();
  });
});
