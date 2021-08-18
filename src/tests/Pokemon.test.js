import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// Busca a lista de pokemons
import pokemons from '../data';

// Para corrigir erros de lint foi criado as constantes abaixo apenas com nomes que campos do App para serem chamados no teste
const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const weightTestId = 'pokemon-weight';
const firstPokemon = pokemons[0]; // Pega o primeiro pokemon
