import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('Teste o About.js', () => {
  render(<About />);

  const headerAbout = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  expect(headerAbout).toBeInTheDocument();

  const imgAbout = screen.getByRole('img');

  expect(imgAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
