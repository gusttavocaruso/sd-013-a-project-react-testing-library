import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';
import dataPokemons from '../data';

describe('Teste se as informações detalhadas do Pokémon selecionado'
+ 'são mostradas na tela.', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon',
    () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More Details/i));
      const pokemon = dataPokemons[0];
      const { name } = pokemon;
      const detailsTXT = screen.getByText(`${name} Details`);
      expect(detailsTXT).toHaveTextContent(`${name} Details`);
    });
  it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
    () => {
      renderWithRouter(<App />);
      let detailsLink = screen.getByText(/More Details/i);
      fireEvent.click(screen.getByText(/More Details/i));
      expect(detailsLink).not.toBeInTheDocument();
      detailsLink = screen.queryByText(/More Details/i);
      expect(detailsLink).toBeNull();
    });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemonSummary = screen.getByText(/Summary/i);
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummary).toContainHTML('<h2>');
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo'
  + 'do Pokémon específico sendo visualizado.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));
    const pokemon = dataPokemons[0];
    const { summary } = pokemon;
    const pokemonSummary = screen.getByText(summary);
    expect(pokemonSummary).toBeInTheDocument();
  });
});

