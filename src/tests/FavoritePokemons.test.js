import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 03 - Teste o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido "No favorite pokemon found", se não tiver pokémons favoritos',
    () => {