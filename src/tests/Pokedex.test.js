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
