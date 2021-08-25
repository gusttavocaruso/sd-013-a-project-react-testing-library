import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../renderWithRouter';
import About from '../components/About';

it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  RenderWithRouter(<About />);

  const text = `This application simulates a Pokédex,
   a digital encyclopedia containing all Pokémons`;

  const text2 = `One can filter Pokémons by type, and
   see more details for each one of them`;
  const paragraph = screen.getByText((content) => content.startsWith(text));
  const paragraph2 = screen.getByText(text2);

  expect(paragraph).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});
