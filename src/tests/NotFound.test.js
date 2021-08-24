import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Tests component NotFound', () => {
  test('if page contains h2 with specific text', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      exact: true,
      name: 'Page requested not found Crying emoji',
    });
    expect(heading).toBeInTheDocument();
  });

  test('if image is in the document and if it is the right one', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
