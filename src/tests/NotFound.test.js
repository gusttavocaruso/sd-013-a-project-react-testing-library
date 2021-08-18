import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test the NotFound component', () => {
  it('should show an not found h2 tag with a specific text', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/not-found');

    const h2 = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(h2).toBeInTheDocument();
  });

  it('should verify if the component have a gif', () => {
    const { history } = renderWithRouter(<NotFound />);
    const gifSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    history.push('/not-found');

    const gifAltText = 'Pikachu crying because the page requested was not found';

    const image = screen.getByAltText(gifAltText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', gifSource);
    expect(image).toHaveAttribute('alt', gifAltText);
    expect(image).toHaveAttribute('class', 'not-found-image');
  });
});
