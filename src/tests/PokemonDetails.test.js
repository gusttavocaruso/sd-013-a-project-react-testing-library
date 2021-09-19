import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';
/* import { Pokemon } from '../components';
import pokemons from '../data'; */

describe('Testa as informações detalhadas do Pokémon selecionado', () => {
  test('Verifica as informações detalhadas', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const details = 'More details';
    const link = screen.getByRole('link', { name: details });

    userEvent.click(link);
    const name = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });

    expect(name).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    const headingDetails = screen.getByRole('heading', { name: 'Summary' });
    expect(headingDetails).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com as localizações do pokémon', () => {
  test('Verifica se mostra a localização, nome, atributos e url', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const heading = screen.getByRole('heading', {
      level: 2, name: /Game Locations of Pikachu/i });
    expect(heading).toBeInTheDocument();

    // resolução copiada do notion da turma
    // https://www.notion.so/Gabaritos-e-Solu-es-de-Exerc-cios-de-Programa-o-7651c81ce6624473a1d66ffb0a2bd053?p=332f9886963a4491bf58da84a11f1a6b
    const images = screen.getAllByAltText('Pikachu location');
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    });
  });
});

describe('Testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const txtFavorite = 'Pokémon favoritado?';
    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(screen.getByText(txtFavorite));
    const favorite = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(screen.getByText(txtFavorite));
    expect(favorite).not.toBeInTheDocument();
  });
});
