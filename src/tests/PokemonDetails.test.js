import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
/* import { Pokemon } from '../components';
import pokemons from '../data'; */

describe('Testa as informações detalhadas do Pokémon selecionado', () => {
  test('Verifica as informações detalhadas', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const details = 'More details';
    const link = screen.getByRole('link', { name: details });

    userEvent.click(link);
    const name = screen.getByText('Pikachu');

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

    const locationForest = screen.getByText('Kanto Viridian Forest');
    const locationPlant = screen.getByText('Kanto Power Plant');

    expect(locationForest).toBeInTheDocument();
    expect(locationPlant).toBeInTheDocument();

    const images = screen.getAllByAltText('Pikachu location');
    images.map((image) => expect(image).toHaveAttribute('src'));
    images.map((image) => expect('Pikachu location').toEqual(image.alt));
  });
});

describe('', () => {
  test('test', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
   
  });
});