import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requisito 04 - Teste o componente NotFound.js', () => {
  test('Testa se página contém um h2 com o texto Page requested not found 😭', () => {
    // Renderizo na tela as rotas do componente NotFound
    renderWithRouter(<NotFound />);
    // getByRole um elemento 'heading'(h1/h2/h3/h4...) busca um título, ou qualquer nível de título, com o name de "Page requested not found".
    const message = screen.getByRole('heading', { name: /Page requested not found/i });
