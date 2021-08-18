import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requisito 04 - Teste o componente NotFound.js', () => {
  test('Testa se página contém um h2 com o texto Page requested not found 😭', () => {
