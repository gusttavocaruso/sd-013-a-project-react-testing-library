import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('testing favoritePokemons component', () => {
  test('check if component renders a msg if no pokemon has been favorited', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const msg = screen.getByText(/Page requested not found/i);
    const img = screen.getByAltText(/Pikachu crying because/i);

    expect(msg).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
