import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('NotFound.js tests', () => {
  test('if not found renders', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();

    const image = screen.getByRole(
      'img', { name: 'Pikachu crying because the page requested was not found' },
    );
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toStrictEqual(src);
  });
});
