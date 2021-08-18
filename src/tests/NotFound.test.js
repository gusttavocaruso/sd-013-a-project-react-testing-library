import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <App.js />', () => {
  it('will test the title of page not found', () => {
    render(<NotFound />);

    const titleNotFound = screen.getByText('Page requested not found');
    expect(titleNotFound).toBeInTheDocument();
  });

  it('will test the image of page not found', () => {
    render(<NotFound />);

    const imagePokedex = screen
      .getByAltText('Pikachu crying because the page requested was not found').src
      .includes('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imagePokedex).toBeTruthy();
  });
});
