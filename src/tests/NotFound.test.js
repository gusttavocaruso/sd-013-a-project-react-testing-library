import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const getH2 = (text) => screen.getByRole('heading', {
  name: text,
  level: 2,
});

describe('Test NotFound.js', () => {
  it('shows not found page when a user requests a page that doesn\'t exist', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/does-not-exist');

    const heading = getH2('Page requested not found Crying emoji');
    expect(heading).toBeInTheDocument();

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
