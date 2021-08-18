// npx stryker run ./stryker/PokemonDetails.conf.json para confirmar que os testes foram realizados em 100%

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
