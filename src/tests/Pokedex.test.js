import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

// Devido erros de lint teve que ser criado estas constantes pois são utilizadas algumas vezes no projeto
const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const typeButtonTestId = 'pokemon-type-button';

// Guarda na variável os types do pokemons percorrendo pelo map
const pokemonTypes = pokemons.map((pokemon) => pokemon.type);

// Cria na constante uniquePokemonTypes um array de tipos de pokemon, tirando os valores repetidos.
const uniquePokemonTypes = [...new Set(pokemonTypes)];

