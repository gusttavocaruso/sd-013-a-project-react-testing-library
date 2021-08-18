import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

// Guarda na variável pokemons a relação de pokemons do data.js
import pokemons from '../data';

// Guarda no firstPokemon o primeiro pokemon do array
const firstPokemon = pokemons[0];

describe('Requisito 02 - Testa o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    // Renderizo na tela as rotas do componente About
    renderWithRouter(<About />);
    // Adiciona à variável pokedexInfo01 se foi encontrado o texto "digital encyclopedia" no documento /about
    const pokedexInfo01 = screen.getByText(/digital encyclopedia/i);
    // Adiciona à variável pokedexInfo02 se foi encontrado o texto "filter pokémons by type" no documento /about
    const pokedexInfo02 = screen.getByText(/filter pokémons by type/i);
    // Testa se a informação da variável pokedexInfo01 está no documento
    expect(pokedexInfo01).toBeInTheDocument();
