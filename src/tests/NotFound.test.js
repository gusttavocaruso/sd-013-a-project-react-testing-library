import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound component:', () => {
  it('should have a h2 \'Page requested not found\'', () => {
    render(<NotFound />);
    const h2 = screen.queryByRole('heading', { name: /page requested not found/i });
    expect(h2).toBeInTheDocument();
  });

  it('should have an image with a specific source url', () => {
    render(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.queryByAltText(alt);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
