import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

it('deve renderizar o componente About com seu titulo e paragrafos', () => {
  render(<About />);
  const aboutHeader = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(aboutHeader).toBeInTheDocument();
  const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
  expect(paragraph1).toBeInTheDocument();
  const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(paragraph2).toBeInTheDocument();
  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
