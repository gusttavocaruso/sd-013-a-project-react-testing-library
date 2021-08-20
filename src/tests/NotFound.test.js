import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('NotFound.js Tests', () => {
  test('test if the page contains a heading h2 with the text Page requested...', () => {
    // Acess screen elements
    render(<NotFound />);
    const titleH2 = screen.getByRole('heading', { name: /Page requested not found/ });
    expect(titleH2).toBeInTheDocument();
  });

  test('test if the page contains an image with the adress urlImg', () => {
    render(<NotFound />);
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altText);
    expect(image.src).toStrictEqual(urlImg);
  });
});
