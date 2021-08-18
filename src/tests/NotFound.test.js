import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

it('deve renderizar o componente About com seu titulo e paragrafos', () => {
  render(<NotFound />);
  const Header = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(Header).toBeInTheDocument();
  const emoji = screen.getByLabelText('Crying emoji');
  expect(emoji).toBeInTheDocument();
  const image = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
