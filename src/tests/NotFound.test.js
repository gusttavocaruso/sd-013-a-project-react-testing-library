import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('NotFound.js tests', () => {
  test('Verifica se a página contem um h2', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });
  test('Verifica se a página contem uma imagem', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/');

    const img = screen.getByAltText(/pikachu crying/i);

    expect(img).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
